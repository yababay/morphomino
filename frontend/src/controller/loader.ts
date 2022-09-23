import { writable, get } from 'svelte/store'
import { fulfillSections } from '../view/sections'
import { processHash, setHashListener, hideAllSections, showSection } from './router'
import { level, levelFiles } from './level'


const progress = writable(0)

function afterLoad(){
    progress.set(100)
    fulfillSections()
    setHashListener()
    processHash()
}

function loadAll($level: string = get(level)){
    hideAllSections()
    showSection('loader')
    console.log(get(levelFiles))
    setTimeout(afterLoad, 5000)
}

export { progress, loadAll }

/*import { writable } from 'svelte/store'
import { processHash, setHashListener } from './router'
import { PartsOfSpeech, PartOfSpeech, MorminoItem } from '../model'

const progress = writable(0)

const posKeys = PartOfSpeech.getKeyNames()
const posKeyLength = posKeys.length

function setLoader(res:Response, i:number): Promise<string> {
    return res.text().then(txt => 
        new Promise((yep) => {
            setTimeout(() => {
                progress.set(100 * i / posKeyLength)
                yep(txt)
            }, 200 * i)
        })
    )
}

const loadAllWords = async ()=> await Promise.all(posKeys.map((key, i) => 
    fetch(`./assets/linguo/${key.toLowerCase()}s.txt`)
        .then(res => setLoader(res, i))
        .then((txt:string) => txt.split('\n')
            .map(word => ({pos: PartsOfSpeech[key], word: word && word.trim() || ''}))
            .filter(item => item.word && item.word.length < 11)
        ))
    )
    .then(arr => {
        const dict = arr.reduce((acc, curr) => [...acc, ...curr], [])
        MorminoItem.setDictionary(dict)   
        PartOfSpeech.setStatistics(dict.map(el => el.pos).sort(el => 1 - Math.random()))
        progress.set(95)
        setTimeout(() => {progress.set(100);setHashListener();processHash()}, 1000)
    })
    .catch(err => console.log(err))

export { progress, loadAllWords }*/

