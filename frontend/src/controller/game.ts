import { get } from 'svelte/store'
import { delayedAction } from './util'
import { elapsedTickerPromise, flowTickerPromise, stopTickers, breakGame, stage, elapsed } from './tickers'
import { GameStages } from '../model'
import { instructionTimeout, dealTimeout } from '../../settings.json'
import { ignoreInstruction } from './settings'
import { resetFlow } from './flow'

async function startGame(){
    resetFlow()
    elapsed.set(0)
    const cause = await Promise.any([
        stageControlPromise(),
        flowTickerPromise()
    ])
    stage.set(cause)
    stopTickers()
}

async function stageControlPromise(): Promise<GameStages>{
    return setFirstStage()
        .then(() => delayedAction(() => stage.set(GameStages.FLOW), dealTimeout))
        .then(elapsedTickerPromise)
}

function setFirstStage(){
    if(get(ignoreInstruction)){
        stage.set(GameStages.DEAL)
        return Promise.resolve()
    } 
    stage.set(GameStages.INSTRUCTION)
    return delayedAction(() => stage.set(GameStages.DEAL), instructionTimeout)
}

export { startGame, breakGame }
