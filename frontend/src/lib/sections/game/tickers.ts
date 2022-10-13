import { writable, get, derived } from 'svelte/store'
import { GameStages, GAME_ENDINGS } from '../../types'
import { duration } from '../settings/settings'
import { getTimeWithUnits } from '../../util'
import { isFullfilled } from './flow'

let tickers = []

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
        const ticker = setInterval(()=> {
            if(get(isFullfilled)) stage.set(GameStages.FULFILLED)
            if(!GAME_ENDINGS.includes(get(stage))) return
            yep(get(stage))
        }, 100)
        tickers.push(ticker)
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
        const ticker = setInterval(()=> {
            const seconds = get(elapsed)
            const d = get(duration)
            if(typeof d === 'boolean' || typeof d === 'string' || typeof d === 'object') return 
            const e = get(elapsed) 
            if(e > d){
                elapsed.set(d) 
                yep(GameStages.TIMEOUT)
            }
            elapsed.set(seconds + 1)
        }, 1000)
        tickers.push(ticker)
    })
}

function stopTickers(){
    tickers.forEach(clearInterval)
    tickers = []
}

export { stage, elapsed, elapsedWithUnits, startTickers, stopTickers, getGameTime }
