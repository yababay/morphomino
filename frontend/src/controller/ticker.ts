import { writable, get, derived } from 'svelte/store'
import { GameStages } from '../model'
import { durationInSeconds } from './settings'

let ticker = null

const stage = writable(GameStages.UNDEFINED)
const elapsedTime = writable(0)
const gameOver = derived(elapsedTime, $elapsedTime => $elapsedTime > get(durationInSeconds))

function startTicker (){
    return new Promise((yep, nop)=> {
        ticker = setInterval($=> {
            const seconds = get(elapsedTime)
            if(get(gameOver)) stage.set(GameStages.TIMEOUT)
            const $stage = get(stage)
            if([
                GameStages.BREAK, 
                GameStages.TIMEOUT, 
                GameStages.FULFILLED, 
                GameStages.DEAD_HEAT, 
                GameStages.GUEST_IS_WON, 
                GameStages.HOST_IS_WON
            ].includes($stage)) return yep($stage)
            elapsedTime.set(seconds + 1)
        }, 1000)
    })
}

function stopTicker(){
    if(ticker) clearInterval(ticker)
}

export { startTicker, stopTicker, stage, elapsedTime }
