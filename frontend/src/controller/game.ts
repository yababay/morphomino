import { derived } from 'svelte/store'
import { delayedAction } from './util'
import { elapsedTickerPromise, flowTickerPromise, stopTickers, breakGame, stage, elapsed } from './tickers'
import { GameStages } from '../model'
import { instructionTimeout, dealTimeout } from '../../settings.json'
import { ignoreInstruction, duration } from './settings'
import { resetFlow } from './flow'

async function startGame(){
    resetFlow()
    elapsed.set(0)
    await Promise.any([
        stageControlPromise(),
        flowTickerPromise()
    ])
    stopTickers()
}

function stageControlPromise(): Promise<GameStages>{
    return setFirstStage()
        .then(() => delayedAction(() => stage.set(GameStages.FLOW), dealTimeout))
        .then(elapsedTickerPromise)
}

function setFirstStage(){
    if(ignoreInstruction){
        stage.set(GameStages.DEAL)
        return Promise.resolve()
    } 
    stage.set(GameStages.INSTRUCTION)
    return delayedAction(() => stage.set(GameStages.DEAL), instructionTimeout)
}

const gameDuration = derived(duration, $duration => {
    if(typeof $duration === 'boolean') return -1
    if(typeof $duration === 'string')  return -1
    if(typeof $duration === 'object')  return -1
    return $duration * 1000
})

export { startGame, breakGame }
