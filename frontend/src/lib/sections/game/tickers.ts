import { writable, get, derived } from 'svelte/store'
import { GameStages, GAME_ENDINGS } from '../../types'
import { duration } from '../settings/settings'
import { getTimeWithUnits } from '../../util'
import { isFullfilled } from './flow'

let flowTicker = null
let elapsedTicker = null

const stage = writable(GameStages.UNDEFINED)
const elapsed = writable(0)
const elapsedWithUnits = derived(elapsed, $elapsed => getGameTime($elapsed, true))

async function startTickers(){
    return await Promise.any([
        elapsedTickerPromise(),
        flowTickerPromise()
    ])
}

async function flowTickerPromise(): Promise<GameStages>{
    return new Promise((yep)=> {
        flowTicker = setInterval(()=> {
            if(get(isFullfilled)) stage.set(GameStages.FULFILLED)
            if(!GAME_ENDINGS.includes(get(stage))) return
            clearInterval(flowTicker)
            yep(get(stage))
        }, 100)
    })
}

function getGameTime($elapsed: number, shorten: boolean = false){
    const [minutes, seconds, minUnitCase, secUnitCase] = getTimeWithUnits($elapsed, shorten)
    const mins = minutes > 0 ? `${minutes} ${minUnitCase} ` : ''
    const secs = seconds > 0 ? `${seconds} ${secUnitCase}`  : ''
    return `${mins}${secs}`
}

async function elapsedTickerPromise(): Promise<GameStages>{
    return new Promise((yep)=> {
        elapsedTicker = setInterval(()=> {
            const seconds = get(elapsed)
            const d = get(duration)
            if(typeof d === 'boolean' || typeof d === 'string' || typeof d === 'object') return 
            const e = get(elapsed) 
            if(e > d){
                elapsed.set(d) 
                clearInterval(elapsedTicker)
                yep(GameStages.TIMEOUT)
            }
            elapsed.set(seconds + 1)
        }, 1000)
    })
}

function stopTickers(){
    if(!!flowTicker) clearInterval(flowTicker)
    if(!!elapsedTicker) clearInterval(elapsedTicker) 
}

export { stage, elapsed, elapsedWithUnits, startTickers, stopTickers, getGameTime }
