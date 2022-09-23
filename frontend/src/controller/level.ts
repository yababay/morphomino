import { derived, writable, get } from "svelte/store"
import { stringFromStorage } from './util'
import { levelKey } from '../../settings.json'
import { PartOfSpeech, Levels, Level } from '../model'

const level = writable(stringFromStorage(levelKey, Levels[Levels.COMMON]))
const levelItem = derived(level, $level => new Level($level))
const levelFiles = derived(levelItem, $item => $item.items.map($=> new PartOfSpeech($).key)
    .map($=> [$, `./assets/linguo/${get(level).replace('CLASS_', 'level-')}/${$.toLowerCase()}.txt`])
)
const levelDescription = derived(level, $level => new Level($level).description)

function getKeysWithLabels(){
    return Level.getKeyNames().map($=> new Level($)).map($=> ({key: $.key, label: $.description}))
}

export { level, levelFiles, levelDescription, getKeysWithLabels }
