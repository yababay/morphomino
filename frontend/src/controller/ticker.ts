import { writable, get } from 'svelte/store'
import { GameStages } from '../model'

let ticker = null

const stage = writable(GameStages.UNDEFINED)
const elapsedTime = writable(0)

function startTicker (){
    return new Promise((yep, nop)=> {
        ticker = setInterval($=> {
            const $stage = get(stage)
            if([
                GameStages.DEAD_HEAT, 
                GameStages.FULFILLED, 
                GameStages.GUEST_IS_WON, 
                GameStages.HOST_IS_WON
            ].includes($stage)) return yep(true)
            const seconds = get(elapsedTime)
            elapsedTime.set(seconds + 1)
        }, 1000)
    })
}

function stopTicker(){
    if(ticker) clearInterval(ticker)
}

export { startTicker, stopTicker, stage, elapsedTime }
