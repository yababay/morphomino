import { get, type Writable } from 'svelte/store'

let tickers = []
let elapsed: Writable<number>

export function setup(_elapsed: Writable<number>){
    elapsed = _elapsed
    return stopTicker
}

export function startTicker(){
    elapsed.set(0)
    const ticker = setInterval(()=> {
        const seconds = get(elapsed)
        elapsed.set(seconds + 1)
    }, 1000)
    tickers.push(ticker)
}

function stopTicker(){
    tickers.forEach(clearInterval)
    tickers = []
}
