import { writable, get } from 'svelte/store'
import { fulfillSections } from '../view/sections'
import { processHash, setHashListener, hideAllSections, showSection } from './router'
import { level, levelFiles } from './level'
import { PartsOfSpeech, PartOfSpeech, MorminoItem } from '../model'

const progress = writable(0)
let firstTime = true

function afterLoad(){
    progress.set(100)
    if(firstTime){
        fulfillSections()
        setHashListener()
        firstTime = false
    }
    processHash()
}

async function loadAll($level: string = get(level)){
    hideAllSections()
    showSection('loader')
    const fileNames = get(levelFiles)
    const { length } = fileNames
    await Promise.all(fileNames.map(($, i)=> {
        const [key, fileName] = $
        return fetch(fileName)
            .then(res => res.text())
            .then(txt => {
                progress.set(100 * i / length)
                return txt.split('\n').map($=> $.trim()).filter($=> !!$ && $.length < 13)
                    .map(word=> ({pos: PartsOfSpeech[key], word}))
            })
    }))
    .then(arr => {
        const dict = arr.reduce((acc, curr) => [...acc, ...curr], [])
        MorminoItem.setDictionary(dict)   
        PartOfSpeech.setStatistics(dict.map(el => el.pos).sort(el => 1 - Math.random()))
        progress.set(100)
        setTimeout(afterLoad, 2000)
    })
    .catch(err => console.log(err))
}

export { progress, loadAll }
