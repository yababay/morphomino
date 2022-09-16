import { readable, writable } from 'svelte/store'
import { PartsOfSpeech, getKeyNames, MorphominoItem, Posable } from './models'

const loader = writable(0)
let statistics = null

function setLoader(res, factor) {
    console.log(factor)
    return res.text().then(txt => 
        new Promise((yep) => {
            setTimeout(() => {
                loader.set(100 * factor)
                yep(txt)
            }, 200)
        })
    )
}

const dictionary = writable([])

function getRandomIndex(arr){
    return Math.floor(Math.random() * arr.length)
}

function getRandomPos(): PartsOfSpeech {
    return statistics[getRandomIndex(statistics)]
}

function getRandomPosable(): Posable {
    return statistics[getRandomIndex(dictionary)]
}

function getRandomItem(): MorphominoItem {
    const posable = getRandomPosable()
    const pos = getRandomPos()
    return new MorphominoItem(posable, pos)
}

Promise.all(getKeyNames().map((key, i) => 
    fetch(`./assets/${key.toLowerCase()}s.txt`)
        .then(res => setLoader(res, i / getKeyNames().length))
        .then(txt => txt.split('\n')
            .map(word => ({pos: PartsOfSpeech[key], word: word && word.trim() || ''}))
            .filter(item => item.word && item.word.length < 13)
        )))
        .then(arr => {
            const dict = arr.reduce((acc, curr) => [...acc, ...curr], [])
            dictionary.set(dict)   
            statistics = dict.map(el => el.pos).sort(el => 1 - Math.random())
            loader.set(99)
            setTimeout(() => loader.set(100), 300)
        }).catch(err => console.log(err))

export { loader, getRandomItem}
