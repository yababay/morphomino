import { writable, get, derived } from 'svelte/store'
import { GameStages, GamerRoles, MoveStatuses, MorminoItem } from '../model'
import { durationInSeconds, moviesAmount, ignoreInstruction, instructionTimeout, setupTimeout, gameSectionId } from './settings'
import { delayedAction } from './util'
import { hash } from './router'

const stage = writable(ignoreInstruction && GameStages.SETUP || GameStages.INSTRUCTION)
const elapsedTime = writable(0)

const role = writable(GamerRoles.HOST)
const moves = writable(new Array(get(moviesAmount)).fill(MoveStatuses.FORTHCOMING))
const flow = writable([MorminoItem.getRandomItem()])

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

function waitForStart(){
    if(ignoreInstruction){
        stage.set(GameStages.SETUP)
        return Promise.resolve(true)
    }
    stage.set(GameStages.INSTRUCTION)
    return waitForStage(GameStages.SETUP, instructionTimeout)
}

function waitForFlow(){
    return waitForStart().then(()=> waitForStage(GameStages.FLOW, setupTimeout))
}

function waitForBreak() {
    return new Promise((yep, nop) => {
        gameTimeCounter = setInterval(() => {
            const seconds = get(elapsedTime)
            elapsedTime.set(seconds + 1)
            if(get(stage) === GameStages.BREAK) nop('The game is broken.')
        }, 1000)
    })
}

async function startGame() {
    try {
        await waitForFlow()
        await Promise.any([
            waitForBreak(),
            waitForStage(GameStages.TIMEOUT, get(durationInSeconds) * 1000)
        ])
    }
    catch(err){
        console.log(err)
    }
    if(gameTimeCounter) clearInterval(gameTimeCounter)
}

function breakGame() {
    stage.set(GameStages.BREAK)
}

export { breakGame, startGame, stage, getScores, elapsedTime }
