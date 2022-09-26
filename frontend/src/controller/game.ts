import { writable, get } from 'svelte/store'
import { delayedAction } from './util'
import { ignoreInstruction, durationInSeconds } from './settings'
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

function setGameTimeoutWithDelay(){
    setStageWithDelay(GameStages.TIMEOUT, get(durationInSeconds) * 1000)
}

async function startGame(){
    resetGame()
    await setFirstStage()
        .then(ok => setFlowWithDelay())
    const result = await Promise.any([
        setGameTimeoutWithDelay(),
        startTicker()
    ])
    if(result === GameStages.TIMEOUT) elapsedTime.set(durationInSeconds)
    stopTicker()
}

function resetGame(){
    stopTicker()
    stage.set(GameStages.UNDEFINED)
    elapsedTime.set(0)
}

function breakTicker(){
    stage.set(GameStages.BREAK)
}

hash.subscribe(value => {
    if(value === gameSectionId) startGame()
    else resetGame()
})

export { stage, startGame, breakTicker }
