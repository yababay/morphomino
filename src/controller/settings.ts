import { derived, writable } from 'svelte/store'
import { numberFromStorage, booleanFromStorage } from './util'
import { durationMin, ignoreInstruction as ignoreInstr, moveAmountMin, moveAmountKey, durationKey, ignoreInstructionKey } from '../settings.json'

const dur = numberFromStorage(durationKey, durationMin)
const mov = numberFromStorage(moveAmountKey, moveAmountMin)
const instr = booleanFromStorage(ignoreInstructionKey, ignoreInstr)
const durationInSeconds = writable(dur)
const moviesAmount = writable(mov)
const ignoreInstruction = writable(instr)

const durationInMinutes = derived(durationInSeconds, $durationInSeconds => $durationInSeconds / 60)

export { durationInSeconds, durationInMinutes, moviesAmount, ignoreInstruction }
