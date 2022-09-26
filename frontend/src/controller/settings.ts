import { derived, writable, get } from 'svelte/store'
import { Level, Levels, PartOfSpeech } from '../model'
import { numberFromStorage, booleanFromStorage, stringFromStorage } from './util'
import { ignoreInstruction as ignoreInstr, moveAmountDefault, durationDefault,
    moveAmountKey, durationKey, ignoreInstructionKey, levelKey } from '../../settings.json'

const durationInSeconds = writable(numberFromStorage(durationKey, durationDefault))
const moviesAmount = writable(numberFromStorage(moveAmountKey, moveAmountDefault))
const ignoreInstruction = writable(booleanFromStorage(ignoreInstructionKey, ignoreInstr))
const durationInMinutes = derived(durationInSeconds, $durationInSeconds => $durationInSeconds / 60)

const level = writable(stringFromStorage(levelKey, Levels[Levels.COMMON]))
const levelItem = derived(level, $level => new Level($level))
const levelDescription = derived(level, $level => new Level($level).description)
const levelFiles = derived(levelItem, $item => $item.items.map($=> new PartOfSpeech($).key)
    .map($=> [$, `./assets/linguo/${get(level).replace('CLASS_', 'level-').toLowerCase()}/${$.toLowerCase()}.txt`])
)

export { durationInSeconds, durationInMinutes, moviesAmount, ignoreInstruction, 
            level, levelItem, levelFiles, levelDescription }
