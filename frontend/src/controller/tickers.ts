import { writable, get, derived } from 'svelte/store'
import { GameStages } from '../model'
import { duration } from './settings'

let flowTicker = null
let elapsedTicker = null

const stage = writable(GameStages.UNDEFINED)
const elapsed = writable(0)
const endings = [GameStages.BREAK, GameStages.FULFILLED]

const gameOver = derived(stage, $stage => 
    [
        GameStages.UNDEFINED, 
        GameStages.BREAK, 
        GameStages.TIMEOUT, 
        GameStages.FULFILLED, 
        GameStages.DEAD_HEAT, 
        GameStages.GUEST_IS_WON, 
        GameStages.HOST_IS_WON
    ].includes($stage)
)

function flowTickerPromise (): Promise<GameStages>{
    return new Promise((yep, nop)=> {
        flowTicker = setInterval(()=> {
            const $stage = get(stage)
            if(endings.includes($stage)) return yep($stage)
        }, 100)
    })
}

function elapsedTickerPromise (): Promise<GameStages>{
    return new Promise((yep, nop)=> {
        elapsedTicker = setInterval(()=> {
            const seconds = get(elapsed)
            const d = get(duration)
            if(typeof d === 'boolean' || typeof d === 'string' || typeof d === 'object') return 
            const e = get(elapsed) 
            if(e > d){
                elapsed.set(d) 
                return yep(GameStages.TIMEOUT)
            }
            elapsed.set(seconds + 1)
        }, 1000)
    })
}

function stopTickers(){
    if(!!flowTicker && !!elapsedTicker) {
        clearInterval(flowTicker)
        clearInterval(elapsedTicker)
    }
}

function stopGame(result: GameStages){
    if(!endings.includes(result)) return
    stopTickers()
    stage.set(result)
}

function breakGame(){
    stopGame(GameStages.BREAK)
}

function setFullfilled(){
    stopGame(GameStages.FULFILLED)
}

export { elapsedTickerPromise, flowTickerPromise, stopTickers, 
    breakGame, setFullfilled, stage, elapsed, gameOver }
