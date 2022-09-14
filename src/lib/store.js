import { writable } from 'svelte/store'

const words = writable("Однажды в студеную зимнюю пору вах вах вах".split(' '))

export { words }
