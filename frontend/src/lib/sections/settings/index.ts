import wrapSetting from './wrapper'
import {
    version,
    versionKey,
    dealAmount,
    instructionTimeout, 
    dealTimeout,
    moveAmountMin,
    moveAmountMax,
    moveAmountStep,
    durationMin,
    durationMax,
    durationStep,
    vignetteVariantKey,
    backgroundColorKey,
    backgroundColorDefault,
    levelKey,
    levelDefault,
    ignoreInstructionKey,
    durationKey,
    durationDefault,
    moveAmountKey,
    moveAmountDefault,
    achievementsKey} from '../../../../settings.json'

const localVersion = localStorage.getItem(versionKey)
if(!localVersion || localVersion !== version){
    localStorage.clear()
    localStorage.setItem(versionKey, version)
}

export const achievements = wrapSetting(achievementsKey, [])
export const movesAmount = wrapSetting(moveAmountKey, moveAmountDefault)
export const duration = wrapSetting(durationKey, durationDefault)
export const ignoreInstruction = wrapSetting(ignoreInstructionKey, false)
export const level = wrapSetting(levelKey, levelDefault)
export const backgroundColor = wrapSetting(backgroundColorKey, backgroundColorDefault)
export const vignetteVariant = wrapSetting(vignetteVariantKey, 1)

export { 
    version,
    versionKey,
    dealAmount,
    instructionTimeout, 
    dealTimeout,
    moveAmountMin,
    moveAmountMax,
    moveAmountStep,
    durationMin,
    durationMax,
    durationStep,
    vignetteVariantKey,
    backgroundColorKey,
    backgroundColorDefault,
    levelKey,
    levelDefault,
    ignoreInstructionKey,
    durationKey,
    durationDefault,
    moveAmountKey,
    moveAmountDefault,
    achievementsKey
}
