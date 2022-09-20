import { writable, get, derived } from 'svelte/store'
import { GameStages, GamerRoles, MoveStatuses, MorminoItem } from '../model'
import { instructionTimeout, setupTimeout, gameSectionId } from '../settings.json'
import { ignoreInstruction, durationInSeconds } from './settings'
import { delayedAction } from './util'
import { hash } from './router'
import { moves, role, stopFlow, flow } from './flow'

function getInitStage(){
    return get(ignoreInstruction) ? GameStages.SETUP : GameStages.INSTRUCTION
}

const stage = writable(getInitStage())
const elapsedTime = writable(0)

const scores = derived(moves, $moves => {
    const scores = $moves.filter(el => 
        get(role) === GamerRoles.HOST && el === MoveStatuses.HOST_IS_WON 
        || 
        get(role) === GamerRoles.GUEST && el === MoveStatuses.GUEST_IS_WON 
        ).length
    return `${scores}/${$moves.length}`
})

let gameTimeCounter = null

hash.subscribe(value => {
    if(value === gameSectionId) startGame()
    else breakGame()
})

function waitForStage (next: GameStages, delay: number){
    return delayedAction(() => {stage.set(next); return next}, delay)
}

function waitForSetup(){
    if(get(ignoreInstruction)){
        stage.set(GameStages.SETUP)
        return Promise.resolve(true)
    }
    stage.set(GameStages.INSTRUCTION)
    return waitForStage(GameStages.SETUP, instructionTimeout)
}

async function waitForFlow(){
    return waitForSetup().then(()=> waitForStage(GameStages.FLOW, setupTimeout))
}

function waitForBreak() {
    return new Promise((yep, nop) => {
        gameTimeCounter = setInterval(() => {
            if(get(stage) === GameStages.BREAK) {
                yep(GameStages.BREAK)
                return
            }
            const seconds = get(elapsedTime)
            elapsedTime.set(seconds + 1)
        }, 1000)
    })
}

async function startGame() {
    elapsedTime.set(0)
    stage.set(getInitStage())
    flow.set([MorminoItem.getRandomItem()])
    try {
        await waitForFlow()
        await Promise.any([
            waitForBreak(),
            waitForStage(GameStages.TIMEOUT, get(durationInSeconds) * 1000),
            //flowController()
        ])
    }
    catch(err){
        console.log(err)
    }
    if(gameTimeCounter) clearInterval(gameTimeCounter)
    if(get(stage) === GameStages.TIMEOUT) elapsedTime.set(get(durationInSeconds))
    stage.set(GameStages.END)
    stopFlow()
}

function breakGame() {
    stage.set(GameStages.BREAK)
}

export { breakGame, startGame, stage, scores, elapsedTime }
