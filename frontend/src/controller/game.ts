import { get } from 'svelte/store'
import { delayedAction } from './util'
import { elapsedTickerPromise, flowTickerPromise, stopTickers, breakGame, stage, elapsed } from './tickers'
import { GameStages } from '../model'
import { instructionTimeout, dealTimeout } from '../../settings.json'
import { achievements, ignoreInstruction } from './settings'
import { resetFlow, scores } from './flow'
import { duration } from './settings'

async function startGame(){
    resetFlow()
    elapsed.set(0)
    const cause = await Promise.any([
        stageControlPromise(),
        flowTickerPromise()
    ])
    stage.set(cause)
    stopTickers()
    const [won, all] = get(scores)
    const date = new Date().getTime()
    const achievement = {date, elapsed: get(elapsed), duration: get(duration), scores: won, moves: all, reason: get(stage)}
    const currentAchievements = get(achievements)
    if(Array.isArray(currentAchievements)) achievements.set([achievement, ...currentAchievements])
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
