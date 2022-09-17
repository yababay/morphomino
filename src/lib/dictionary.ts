import { writable, get } from 'svelte/store'
import { PartsOfSpeech, getKeyNames, MorphominoItem, WordWithPos } from './models'

const loader = writable(0)
let statistics: PartsOfSpeech[] = null

function setLoader(res:Response, i:number, length:number) {
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

function getRandomIndex(arr: any[]){
    return Math.floor(Math.random() * arr.length)
}

function getRandomPos(): PartsOfSpeech {
    return statistics[getRandomIndex(statistics)]
}

function getRandomWordWithPos(): WordWithPos {
    const dict = get(dictionary)
    return dict[getRandomIndex(dict)]
}

/*
Глаголов 37319;
Существительных 56332
Прилагательных 24786
Местоимений 93
Наречий 1916 	
Числительных 117
Междометий 341
Союзов 110
Предлогов 141
Частиц 149
*/

function getStatisticsByPos(pos: PartsOfSpeech): number {
    return statistics.filter((el:PartsOfSpeech) => el === pos).length
}

function getRandomItem(): MorphominoItem {
    const WordWithPos = getRandomWordWithPos()
    const pos = getRandomPos()
    return new MorphominoItem(WordWithPos, pos)
}

Promise.all(getKeyNames().filter(el => el !== 'UNDEFINED').map((key, i) => 
    fetch(`./assets/${key.toLowerCase()}s.txt`)
        .then(res => setLoader(res, i, getKeyNames().length))
        .then((txt:string) => txt.split('\n')
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
