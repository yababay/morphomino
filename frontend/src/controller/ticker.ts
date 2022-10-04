import { writable, get, derived } from 'svelte/store'
import { GameStages } from '../model'
import { duration } from './settings'

let ticker = null

const stage = writable(GameStages.UNDEFINED)
const elapsed = writable(0)
const endings = [GameStages.BREAK, GameStages.FULFILLED, 
    GameStages.DEAD_HEAT, GameStages.GUEST_IS_WON, GameStages.HOST_IS_WON]

function tickerIterations (): Promise<GameStages>{
    return new Promise((yep, nop)=> {
        ticker = setInterval(()=> {
            const $stage = get(stage)
            if(endings.includes($stage)) return yep($stage)
            const seconds = get(elapsed)
            elapsed.set(seconds + 1)
        }, 1000)
    })
}

function stopTicker(){
    if(ticker) {
        clearInterval(ticker)
        const d = get(duration)
        if(typeof d === 'boolean' || typeof d === 'string' || typeof d === 'object') return 
        const e = get(elapsed) 
        if(e > d) elapsed.set(d) 
    }
}

export { tickerIterations, stopTicker, stage, elapsed }
