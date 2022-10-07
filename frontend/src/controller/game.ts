import { delayedAction } from './util'
import { elapsedTickerPromise, flowTickerPromise, stopTickers, breakGame, stage, elapsed } from './tickers'
import { GameStages } from '../model'
import { instructionTimeout, dealTimeout } from '../../settings.json'
import { ignoreInstruction } from './settings'
import { resetFlow } from './flow'

async function startGame(){
    console.log('game is started');
/*    stopTickers()
    resetFlow()
    elapsed.set(0)
    await Promise.any([
        stageControlPromise(),
        flowTickerPromise()
    ])
    stopTickers()*/
}

async function stageControlPromise(): Promise<GameStages>{
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

export { startGame, breakGame }
