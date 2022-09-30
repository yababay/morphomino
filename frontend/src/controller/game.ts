import { get } from 'svelte/store'
import { delayedAction } from './util'
import { ignoreInstruction, addAchievement, durationInSeconds } from './settings'
import { instructionTimeout, setupTimeout } from '../../settings.json'
import { startTicker, stopTicker, stage, elapsedTime } from './ticker'
import { GameStages, MorminoItem } from '../model'
import { setInitialMoves, scores as scoresRaw, flow } from './flow'

function setStageWithDelay (next: GameStages, delay: number){
    return delayedAction(() => {stage.set(next); return next}, delay)
}

function setFirstStage(){
    if(ignoreInstruction){
        stage.set(GameStages.DEAL)
        return Promise.resolve(true)
    }
    stage.set(GameStages.INSTRUCTION)
    return setStageWithDelay(GameStages.DEAL, instructionTimeout)
}

function setFlowWithDelay(){
    return setStageWithDelay(GameStages.FLOW, setupTimeout)
}

async function startGame(){
    resetGame()
    const reason = await setFirstStage()
        .then(ok => setFlowWithDelay())
        .then(ok => startTicker())
    stopTicker()    
    const [scores, moves] = get(scoresRaw).split('/')
    const elapsed = get(elapsedTime)
    const duration = get(durationInSeconds)
    const date = new Date().getTime()
    addAchievement({date, elapsed, duration, scores, moves, reason})
}

function resetGame(){
    stopTicker()
    flow.set([MorminoItem.getRandomItem()])
    stage.set(GameStages.UNDEFINED)
    setInitialMoves()
    elapsedTime.set(0)
}

function breakGame(){
    stage.set(GameStages.BREAK)
}

export { stage, startGame, breakGame }
