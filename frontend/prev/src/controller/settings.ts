import { Level } from '../model'
import { derived, writable } from 'svelte/store'
import { moveAmountKey, durationKey, ignoreInstructionKey, levelKey, achievementsKey, rgbKey, vignetteVariantKey } from '../../settings.json'
import { moveAmountDefault, durationDefault, ignoreInstructionDefault, levelDefault, rgbDefault} from '../../settings.json'
import type { Writable } from 'svelte/types/runtime/store/index'

const achievements = wrapSetting(achievementsKey, [])
const movesAmount = wrapSetting(moveAmountKey, moveAmountDefault)
const duration = wrapSetting(durationKey, durationDefault)
const ignoreInstruction = wrapSetting(ignoreInstructionKey, ignoreInstructionDefault)
const level = wrapSetting(levelKey, levelDefault)
const rgb = wrapSetting(rgbKey, rgbDefault)
const vignette = wrapSetting(vignetteVariantKey, 1)
const levelDescription = derived(level, ($level: string) => new Level($level).description)

function prepareForStorage(value: string | boolean | number | object): string{
    return typeof value === 'object' ? JSON.stringify(value) : `${value}`
}

function wrapSetting(key: string, byDefault: string | number | boolean | object): Writable<string | number | boolean | object>{
    let value: string | number | boolean | object = localStorage.getItem(key)
    if(!value){
        localStorage.setItem(key, prepareForStorage(byDefault))
        value = byDefault
    }
    else {
        switch (typeof byDefault) {
            case 'number':
                value = parseFloat(value)
                break
            case 'boolean':
                value = value === 'true'
                break
            case 'object':
                value = JSON.parse(value)
        }
    }
    let writer = writable(value)
    writer.subscribe($value => {
        localStorage.setItem(key, prepareForStorage($value)) 
    })
    return writer
}

export { movesAmount, duration, ignoreInstruction, achievements, level, rgb, levelDescription, vignette }
