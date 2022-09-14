import { writable } from 'svelte/store'
import { PartsOfSpeech } from './parts-of-speech'

console.log(Object.keys(PartsOfSpeech).filter(v => isNaN(Number(v))).map(key => key.toLowerCase()))


const words = writable("Однажды в студеную зимнюю пору вах вах вах".split(' '))

export { words }
