import { get } from 'svelte/store'
import { progress, level } from '../../store'
import { delayedAction } from '../../util'
import { Level, PartOfSpeech, MorminoItem } from '../../types'

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

export default async function loadLevel(){
    await delayedAction(300)
    showLoader()
    const {fileNames} = new Level(`CLASS_${get(level)}`)
    progress.set(10)
    await delayedAction(300)
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
        MorminoItem.setDictionary(dict)   
        PartOfSpeech.setStatistics(dict.map($ => $.pos).sort(el => 1 - Math.random()))
    })
    .catch(err => console.log(err))
    progress.set(75)
    await delayedAction(1000)
    progress.set(100)
    await delayedAction(2000)
    hideLoader()
}
