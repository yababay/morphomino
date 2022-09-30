import { derived, writable, get } from 'svelte/store'
import { Level, Levels, PartOfSpeech } from '../model'
import { numberFromStorage, booleanFromStorage, stringFromStorage, saveObject } from './util'
import { ignoreInstruction as ignoreInstr, moveAmountDefault, durationDefault,
    moveAmountKey, durationKey, ignoreInstructionKey, levelKey,
    defaultRed, defaultGreen, defaultBlue, redKey, greenKey, blueKey, achievementsKey
} from '../../settings.json'

const achievementsString = writable(stringFromStorage(achievementsKey, '[]'))
const achievements = derived(achievementsString, $achievementsString => JSON.parse($achievementsString))

function addAchievement(achievement: object){
    saveObject(achievementsKey, [achievement, ...get(achievements)], achievementsString)
}

function removeAchievement(date: number){
    saveObject(achievementsKey, get(achievements).filter($=> $.date !== date), achievementsString)
}

const red = writable(numberFromStorage(redKey, defaultRed))
const green = writable(numberFromStorage(greenKey, defaultGreen))
const blue = writable(numberFromStorage(blueKey, defaultBlue))
const rgb = derived([red, green, blue], ([$red, $green, $blue]) => `rgb(${$red}, ${$green}, ${$blue})`)

const durationInSeconds = writable(numberFromStorage(durationKey, durationDefault))
const moviesAmount = writable(numberFromStorage(moveAmountKey, moveAmountDefault))
const ignoreInstruction = writable(booleanFromStorage(ignoreInstructionKey, ignoreInstr))
const durationInMinutes = derived(durationInSeconds, $durationInSeconds => Math.floor($durationInSeconds / 60))

const level = writable(stringFromStorage(levelKey, Levels[Levels.COMMON]))
const levelItem = derived(level, $level => new Level($level))
const levelDescription = derived(level, $level => new Level($level).description)
const levelFiles = derived(levelItem, $item => $item.items.map($=> new PartOfSpeech($).key)
    .map($=> [$, `./assets/linguo/${get(level).replace('CLASS_', 'level-').toLowerCase()}/${$.toLowerCase()}.txt`])
)

export { durationInSeconds, durationInMinutes, moviesAmount, ignoreInstruction, 
            level, levelItem, levelFiles, levelDescription, red, green, blue, rgb, 
            achievements, addAchievement, removeAchievement }
