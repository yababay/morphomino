import { derived, get } from 'svelte/store'
import { delayedAction } from './util'
import { tickerIterations, stopTicker, stage, elapsed } from './ticker'
import { GameStages } from '../model'
import { instructionTimeout, dealTimeout } from '../../settings.json'
import { ignoreInstruction, duration } from './settings'

async function startGame(){
    elapsed.set(0)
    const result = await Promise.any([
        stageIterations(),
        tickerIterations()
    ])
    stopGame(result)
}

function stopGame(result: GameStages){
    stopTicker()
    stage.set(result)
}

function stageIterations(): Promise<GameStages>{
    return setFirstStage()
        .then(() => delayedAction(() => stage.set(GameStages.FLOW), dealTimeout))
        .then(() => delayedAction(() => stage.set(GameStages.TIMEOUT), get(gameDuration)))
        .then(() => Promise.resolve(GameStages.TIMEOUT))
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

export { startGame, stopGame }
