import { writable } from "svelte/store"
import { stringFromStorage, setComponent } from './util'
import { levelKey } from '../../settings.json'
import { PartsOfSpeech, Levels, PosByLevel } from '../model'
/*
const levelId = 'level'
const levelSection = document.getElementById(levelId)
const { Modal } = window['bootstrap']
const levelModal = new Modal(levelSection.querySelector('div'))
setComponent(Level, levelId)

function showLevelChooser(){
    levelModal.show()
}
*/
const level = writable(stringFromStorage(levelKey, 'common'))

function chooseLevel(){
//    return new
}

export { level }
