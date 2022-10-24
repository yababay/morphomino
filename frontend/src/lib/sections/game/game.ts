export default null
/*import { get, writable } from "svelte/store"
import { startTicker, gameOver, elapsed } from "./ticker"
import { resetFlow, stage, scores } from "./flow"
import { GameStages } from "src/lib/types"
import { achievements, duration, level } from '../settings/settings'
import loadLevel from './loader'
import { delayedAction, hashWithParams } from '../../router'
import { instructionTimeout, dealTimeout } from '../settings/settings.json'
import { ignoreInstruction } from '../settings/settings'

export const progress = writable(0)

export async function startGame(){
    stage.set(GameStages.UNDEFINED)
    resetFlow()
    progress.set(0)
    startTicker()
    stage.set(GameStages.LOADING)
    await loadLevel(`${get(level)}`, progress)
    await showInstruction()
    await showDealing()
}

async function showInstruction(){
    if(ignoreInstruction) return
    stage.set(GameStages.INSTRUCTION)
    await delayedAction(instructionTimeout)
}

async function showDealing(){
    stage.set(GameStages.DEAL)
    await delayedAction(dealTimeout)
    stage.set(GameStages.FLOW)
}
*/