import { derived, get } from 'svelte/store'
import { hashWithParams } from '@yababay67/svelte-hash-router-ts'
import { stage, startTickers, stopTickers, elapsed } from './tickers'
import { delayedAction } from '../../util'
import { instructionTimeout, dealTimeout } from '../settings/settings.json'
import { ignoreInstruction, duration, achievements } from '../settings/settings'
import { GameStages } from '../../types'
import { resetFlow, scores } from './flow'

async function showInstruction(){
    stage.set(GameStages.INSTRUCTION)
    await delayedAction(instructionTimeout)
}

async function showDealing(){
    stage.set(GameStages.DEAL)
    await delayedAction(dealTimeout)
    stage.set(GameStages.FLOW)
}

const isGame = derived(hashWithParams, $hash => {
    const value = typeof $hash !== 'string' && Reflect.get($hash, 'hash') || $hash
    return value === '#game' 
})

isGame.subscribe(yes => {
    document.body.style.backgroundImage = yes ? 'url(./img/background.png)' : null
})

async function startGame() {
    resetFlow()
    if(!get(ignoreInstruction)) await showInstruction()
    await showDealing()
    const cause = await startTickers()
    stopTickers()
    stage.set(cause)
    const [won, all] = get(scores)
    const date = new Date().getTime()
    const achievement = {date, elapsed: get(elapsed), duration: get(duration), scores: won, moves: all, reason: get(stage)}
    const currentAchievements = get(achievements)
    if(Array.isArray(currentAchievements)) achievements.set([achievement, ...currentAchievements])
}

export { isGame, startGame }
