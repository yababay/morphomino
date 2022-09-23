import { writable } from "svelte/store"
import { stringFromStorage, setComponent } from './util'
import { levelKey } from '../../settings.json'
import Level from "src/view/components/Level.svelte"
import { PartsOfSpeech } from '../model'

enum Levels {
    COMMON,
    CLASS_7_1,
    CLASS_7_2
}

const levelId = 'level'
setComponent(Level, levelId)
const levelSection = document.getElementById(levelId)
const { Modal } = window['bootstrap']
const levelModal = new Modal(levelSection)

function showLevelModal(){
    levelModal.show()
}

const level = writable(stringFromStorage(levelKey, 'common'))

function chooseLevel(){
//    return new
}

export { level, showLevelModal }
