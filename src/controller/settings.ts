import { derived, writable, get } from 'svelte/store'
import { numberFromStorage, booleanFromStorage } from './util'
import { ignoreInstruction as ignoreInstr, moveAmountDefault, durationDefault,
    moveAmountKey, durationKey, ignoreInstructionKey } from '../settings.json'

const dur = numberFromStorage(durationKey, durationDefault)
const mov = numberFromStorage(moveAmountKey, moveAmountDefault)
const instr = booleanFromStorage(ignoreInstructionKey, ignoreInstr)
const durationInSeconds = writable(dur)
const moviesAmount = writable(mov)
const ignoreInstruction = writable(instr)

const durationInMinutes = derived(durationInSeconds, $durationInSeconds => $durationInSeconds / 60)

export { durationInSeconds, durationInMinutes, moviesAmount, ignoreInstruction }
