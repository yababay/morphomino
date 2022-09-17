import { readable, writable } from 'svelte/store'
import { PartsOfSpeech, getKeyNames, MorphominoItem, WordWithPos } from './models'

const loader = writable(0)
let statistics = null

function setLoader(res, i, length) {
    return res.text().then(txt => 
        new Promise((yep) => {
            setTimeout(() => {
                loader.set(100 * i / length)
                yep(txt)
            }, 200 * i)
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

function getRandomWordWithPos(): WordWithPos {
    return statistics[getRandomIndex(dictionary)]
}

function getStatisticsByPos(pos): number {
    return statistics.filter(el => el === pos).length
}

function getRandomItem(): MorphominoItem {
    const WordWithPos = getRandomWordWithPos()
    const pos = getRandomPos()
    return new MorphominoItem(WordWithPos, pos)
}

Promise.all(getKeyNames().filter(el => el !== 'UNDEFINED').map((key, i) => 
    fetch(`./assets/${key.toLowerCase()}s.txt`)
        .then(res => setLoader(res, i, getKeyNames().length))
        .then(txt => txt.split('\n')
            .map(word => ({pos: PartsOfSpeech[key], word: word && word.trim() || ''}))
            .filter(item => item.word && item.word.length < 13)
        )))
        .then(arr => {
            const dict = arr.reduce((acc, curr) => [...acc, ...curr], [])
            dictionary.set(dict)   
            statistics = dict.map(el => el.pos).sort(el => 1 - Math.random())
            loader.set(95)
            setTimeout(() => loader.set(100), 1000)
        }).catch(err => console.log(err))

export { loader, getRandomItem, getStatisticsByPos }
