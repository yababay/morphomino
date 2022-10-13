import { derived } from 'svelte/store'
import { Level } from '../../types'
import wrapSetting from './wrapper'
import {
    achievementsKey,
    moveAmountKey, moveAmountDefault,
    durationKey, durationDefault,
    ignoreInstructionKey, 
    levelKey, levelDefault,
    backgroundColorKey, backgroundColorDefault,
    vignetteVariantKey,
} from './settings.json'

const achievements = wrapSetting(achievementsKey, [])
const movesAmount = wrapSetting(moveAmountKey, moveAmountDefault)
const duration = wrapSetting(durationKey, durationDefault)
const ignoreInstruction = wrapSetting(ignoreInstructionKey, false)
const level = wrapSetting(levelKey, levelDefault)
const backgroundColor = wrapSetting(backgroundColorKey, backgroundColorDefault)
const vignetteVariant = wrapSetting(vignetteVariantKey, 1)

const levelDescription = derived(level, ($level: string) => new Level(`CLASS_${$level}`).description)

export { 
    achievements, 
    movesAmount, 
    duration, 
    ignoreInstruction, 
    backgroundColor, 
    vignetteVariant, 
    level,
    levelDescription 
}
