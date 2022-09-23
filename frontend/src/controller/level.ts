import { derived, writable, get } from "svelte/store"
import { stringFromStorage } from './util'
import { levelKey } from '../../settings.json'
import { PartOfSpeech, Levels, Level } from '../model'

const level = writable(stringFromStorage(levelKey, Levels[Levels.COMMON]))
const levelFiles = derived(level, $level => new Level($level).items
    .map($=> new PartOfSpeech($).key)
    .map($=> `./assets/linguo/${get(level).replace('CLASS_', 'level-')}/${$.toLowerCase()}.txt`)
)

function getKeysWithLabels(){
    return Level.getKeyNames().map($=> new Level($)).map($=> ({key: $.key, label: $.description}))
}

export { level, levelFiles, getKeysWithLabels }
