import { writable, get, derived } from 'svelte/store'
import { GameStages, GAME_ENDINGS } from '../model'
import { duration } from './settings'
import { getTimeWithUnits } from './util'

let flowTicker = null
let elapsedTicker = null

const stage = writable(GameStages.UNDEFINED)
const elapsed = writable(0)
const gameOver = derived(stage, $stage => GAME_ENDINGS.includes($stage))
const elapsedWithUnits = derived(elapsed, $elapsed => getGameTime($elapsed, true))

function getGameTime($elapsed: number, shorten: boolean = false){
    const [minutes, seconds, minUnitCase, secUnitCase] = getTimeWithUnits($elapsed, shorten)
    const mins = minutes > 0 ? `${minutes} ${minUnitCase} ` : ''
    const secs = `${seconds} ${secUnitCase}`
    return `${mins}${secs}`
}

function isGameEnded(): boolean{
    const $stage = get(stage)
    console.log(GAME_ENDINGS, $stage)
    return GAME_ENDINGS.includes($stage)
}

async function flowTickerPromise (): Promise<GameStages>{
    return new Promise((yep, nop)=> {
        flowTicker = setInterval(()=> {
            if(isGameEnded()) return yep(get(stage))
        }, 100)
    })
}

async function elapsedTickerPromise (): Promise<GameStages>{
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
    if(!!flowTicker) clearInterval(flowTicker)
    if(!!elapsedTicker) clearInterval(elapsedTicker) 
}

function stopGame(result: GameStages){
    if(!GAME_ENDINGS.includes(result)) return
    stopTickers()
    stage.set(result)
}

function breakGame(){
    stopGame(GameStages.BREAK)
}

function setFullfilled(){
    stopGame(GameStages.FULFILLED)
}

export { elapsedTickerPromise, flowTickerPromise, stopTickers, elapsedWithUnits, getGameTime, 
    breakGame, setFullfilled, stage, elapsed, gameOver, isGameEnded }
