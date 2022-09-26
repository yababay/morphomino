import { delayedAction } from './util'
import { ignoreInstruction } from './settings'
import { instructionTimeout, setupTimeout, gameSectionId } from '../../settings.json'
import { startTicker, stopTicker, stage, elapsedTime } from './ticker'
import { GameStages } from '../model'
import { hash } from './router'

function setStageWithDelay (next: GameStages, delay: number){
    return delayedAction(() => {stage.set(next); return next}, delay)
}

function setFirstStage(){
    if(ignoreInstruction){
        stage.set(GameStages.SETUP)
        return Promise.resolve(true)
    }
    stage.set(GameStages.INSTRUCTION)
    return setStageWithDelay(GameStages.SETUP, instructionTimeout)
}

function setFlowWithDelay(){
    return setStageWithDelay(GameStages.FLOW, setupTimeout)
}

async function startGame(){
    resetGame()
    const result = await setFirstStage()
        .then(ok => setFlowWithDelay())
        .then(ok => startTicker())
    stopTicker()
}

function resetGame(){
    stopTicker()
    stage.set(GameStages.UNDEFINED)
    elapsedTime.set(0)
}

function breakGame(){
    stage.set(GameStages.BREAK)
}

export { stage, startGame, breakGame }
