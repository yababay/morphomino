import { writable, get } from 'svelte/store'
import { level } from './settings'
import { Level, PartOfSpeech, MorminoItem } from '../model'
import { isReady, setupRouter, processHash } from './router'
import { delayedAction } from './util'

const progress = writable(1)

async function loadLevel(){
    const {fileNames} = new Level(`${get(level)}`)
    const { length } = fileNames
    await Promise.all(fileNames.map(({pos, path}, i) => {
        return fetch(path)
            .then(res => res.text())
            .then(txt => {
                progress.set(100 * i / length)
                return txt.split('\n')
                    .map($=> $.trim())
                    .filter($=> $ && $.length < 13)
                    .map(word => ({pos, word}))
            })
    }))
    .then(arr => {
        const dict = arr.reduce((acc, curr) => [...acc, ...curr], [])
        MorminoItem.setDictionary(dict)   
        PartOfSpeech.setStatistics(dict.map(el => el.pos).sort(el => 1 - Math.random()))
        progress.set(95)
    })
    .then(() => delayedAction(() => {
        progress.set(100)
        setupRouter()
        processHash()
    }, 2000))
    .catch(err => console.log(err))
}

export { progress, loadLevel }
