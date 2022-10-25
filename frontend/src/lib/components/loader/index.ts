import { progress, dictionary } from '../../store'
import { delayedAction } from '../../util'
import { Level, PartOfSpeech, MorminoItem, MoveStatuses } from '../../types'
import { stopTicker } from '../sections/game'

const headerMainFooter = Array.from(document.querySelectorAll('header, main, footer'))
const loaderSection = document.getElementById('loader')

function showLoader(){
    headerMainFooter.forEach(el => el.classList.add('d-none'))
    loaderSection.classList.remove('d-none')
}

function hideLoader(){
    headerMainFooter.forEach(el => el.classList.remove('d-none'))
    loaderSection.classList.add('d-none')
}

function isGame(){
    return window.location.hash.startsWith('#game')
}

export default async function loadLevel(level){
    stopTicker()
    if(isGame()){
        await delayedAction(300)
        showLoader()
    }
    const {fileNames} = new Level(`CLASS_${level}`)
    if(isGame()) {
        progress.set(10)
        await delayedAction(300)
    }
    await Promise.all(fileNames.map(({pos, path}) => {
        return fetch(path)
            .then(res => res.text())
            .then(txt => {
                return txt.split('\n')
                    .map($=> $.trim())
                    .filter($=> $ && !$.startsWith('#') && $.length < 13)
                    .map(word => ({pos, word}))
            })
    }))
    .then(arr => {
        const dict = arr.reduce((acc, curr) => [...acc, ...curr], [])
        dictionary.set(dict)
        MorminoItem.setDictionary(dict)   
        PartOfSpeech.setStatistics(dict.map($ => $.pos).sort(el => 1 - Math.random()))
    })
    .catch(err => console.log(err))
    if(isGame()) {
        progress.set(75)
        await delayedAction(500)
    }
    if(isGame()) {
        progress.set(100)
        await delayedAction(1000)
        hideLoader()
    }
}
