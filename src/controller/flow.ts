import { writable, get, derived } from 'svelte/store'
import { GamerRoles, MoveStatuses, MorminoItem } from '../model'
import { moviesAmount, durationInSeconds } from './settings'
import { minMoveTimeout, dealAmount } from '../settings.json'

const moves = writable(new Array(get(moviesAmount)).fill(MoveStatuses.FORTHCOMING))
const flow = writable([])
const lastStatus = derived(moves, $moves => $moves.find(el => el !== MoveStatuses.FORTHCOMING) || MoveStatuses.FORTHCOMING)
const role = writable(GamerRoles.HOST)
const alert = writable('')

function setRandomItems(){
    deal.set(getRandomItems())
}

function getRandomItems(){
    return new Array(dealAmount).fill(0).map($=> MorminoItem.getRandomItem())
} 

const deal = writable([])

function getMoveTimeout(){
    const calculated = get(durationInSeconds) / get(moviesAmount)
    return calculated > minMoveTimeout && calculated || minMoveTimeout
}

function makeMove(item: MorminoItem, $role = get(role)): boolean {
    const $flow = get(flow)
    if(!$flow.length) return false
    const lastCard = $flow.at(-1)
    if(!lastCard.isCongeneric(item)){
        alert.set(`"${item.word}" - это не ${lastCard.nextNomenative}.`)
        setTimeout($=> alert.set(''), 3000)
        return false
    } 
    const status = $role === GamerRoles.HOST && MoveStatuses.HOST_IS_WON || MoveStatuses.GUEST_IS_WON
    const $moves = get(moves)
    const lastIndex = $flow.length - 1
    moves.set([...$moves.slice(0, lastIndex), status, ...$moves.slice(lastIndex + 1)])
    flow.set([...$flow, item])
    if($role === GamerRoles.HOST) return status === MoveStatuses.HOST_IS_WON 
    return status === MoveStatuses.GUEST_IS_WON
}

let flowInterval = null

function flowController(){
    return new Promise((yep, nop) => {
        let moveTimeout = get(durationInSeconds) / get(moviesAmount)
        if(moveTimeout < minMoveTimeout) moveTimeout = minMoveTimeout
        flowInterval = setInterval(() => {

        }, moveTimeout)
    })
}

function stopFlow(){
    if(flowInterval) clearInterval(flowInterval)
}

export { moves, flow, role, makeMove, flowController, stopFlow, alert, deal, setRandomItems }

/*
import { fromStorage, getTimeWithUnits } from './util'
import { durationMin, moveAmountMin, ignoreInstructionKey, ignoreInstruction, instructionTimeout, setupTimeout } from '../settings.json'
import { GameStages, MoveStatuses, GamerRoles } from '../model/types'

const stage = writable(GameStages.INSTRUCTION)
const role = writable(GamerRoles.HOST)
const durationInSeconds = writable(durationMin)
const moviesAmount = writable(moveAmountMin)
const elapsedTime = writable(0)
const moves = writable([])

function getScores() {

}

function getElapsedTimeWithUnits() {
    const {seconds, minutes, minUnitCase, secUnitCase} = getTimeWithUnits(get(elapsedTime))
    return `${minutes} ${minUnitCase} ${seconds} ${secUnitCase}`
}

let gameTimeCounter = null

function gameTicker() {
    return new Promise((yep, nop) => {
        gameTimeCounter = setInterval(() => {
            const seconds = get(elapsedTime)
            elapsedTime.set(seconds + 1)
            if(get(stage) === GameStages.BREAK) nop('The game is broken.')
        }, 1000)
    })
}

const delayedAction = (func, delay) => new Promise((yep, nop) => setTimeout(() => yep(func()), delay))

const promises = [
    delayedAction(() => stage.set(GameStages.SETUP), instructionTimeout),
    delayedAction(() => stage.set(GameStages.FLOW), instructionTimeout + setupTimeout),
    delayedAction(() => stage.set(GameStages.BREAK), get(durationInSeconds) * 1000),
    gameTicker(),
]

function setupGame(){
    moves.set(new Array(moveAmountMin).fill(MoveStatuses.FORTHCOMING))
    const ign = fromStorage(ignoreInstructionKey, ignoreInstruction)
    stage.set(ign ? GameStages.SETUP : GameStages.INSTRUCTION)
    elapsedTime.set(0)
}

async function startGame(){
    setupGame()
    try {
        await Promise.all(promises)
    }
    catch(err){
        console.log(err)
    }
    stopGame()
}

function stopGame(){
    if(gameTimeCounter) clearInterval(gameTimeCounter)
    stage.set(GameStages.END)
}

export { 
    GameStages, MoveStatuses, GamerRoles,
    stage, durationInSeconds, moviesAmount, elapsedTime, moves, role,
    getElapsedTimeWithUnits, getScores, startGame, stopGame, 
}
*/
/*
import { PartsOfSpeech, getKeyNames, MorphominoItem } from './models'

const gameTime = writable(0)
const scores = writable(new Array(100).fill(0))

const hashHolder = writable('')
const firstPlayer = writable([])
const secondPlayer = writable([])
const gameFlow = writable([new MorphominoItem, new MorphominoItem])
const alertMessage = writable('')
const gameOver = writable(false)

let moveCount = 0
let gameTimeCounter = null

function startGame() {
    if(gameTimeCounter) clearInterval(gameTimeCounter)
    gameTimeCounter = setInterval(() => {
        const seconds = get(gameTime)
        gameTime.set(seconds + 1)
    }, 1000)
    return Promise.all(new Array(100).fill(0).map(el => moveCount++).map(i => new Promise((yep, nop) => {
        if(typeof get(scores)[i] === 'boolean'){
            yep(null)
            return
        } 
        setTimeout(() => {
            if(get(gameOver)) {
                nop()
                return
            }
            const arrScores = Array.from(get(scores))
            if(arrScores[i] === 0) arrScores[i] = false
            scores.set(arrScores)
            const lastCard = get(gameFlow).at(-1)
            let pos = lastCard.nextPos
            if(pos === PartsOfSpeech.UNDEFINED) pos = PartsOfSpeech.NOUN
            const item = new MorphominoItem(findNextPos(pos))
            gameFlow.set([...get(gameFlow), item])
            yep(i)
        }, 5000 * i)
    })))
}

function makeMove(item, index, val){
    const fromFlow = get(gameFlow).at(-1)
    const isCongeneric = item.isCongeneric(fromFlow)
    if(!isCongeneric) {
      showAlert(`Слово "${item.value}" - не ${fromFlow.longPosName}!`)
      return
    }
    const arr = [...get(scores)]
    let count = 0
    while(typeof arr[count] === 'boolean') count++
    arr[count] = val
    scores.set(arr)
    replaceForFirst(index)
    gameFlow.set([...get(gameFlow), item])
}

function showAlert(msg){
    alertMessage.set(msg)
    setTimeout(() => alertMessage.set(''), 4000)
}

let dictionary = null

function findNextPos(pos: PartsOfSpeech){
    shuffleDictionary()
    return dictionary.find(el => el.pos === pos)
}

function shuffleDictionary(){
    if(dictionary) dictionary.sort(el => Math.random() > .5 ? 1 : -1) 
}

function resetForFirst() {
    firstPlayer.set(getRandomItems())
}
*/
/*Promise.all(getKeyNames().map(key => 
        fetch(`./assets/${key.toLowerCase()}s.txt`)
        .then(res => res.text())
        .then(txt => txt.split('\n')
            .map(word => word.trim())
            .map(word => ({pos: PartsOfSpeech[key], word: word && word.trim() || ''}))
            .filter(item => item.word && item.word.length < 13)
        ))
).then(arr => {
    dictionary = arr.reduce((acc, curr) => {
        return [...acc, ...curr]
    }, [])   
    firstPlayer.set(getRandomItems())
    secondPlayer.set(getRandomItems())
    gameFlow.set([...get(gameFlow), getRandomItem()])
    return Promise.resolve()
})
*/
/*.then(() => {
    gameTimeCounter = setInterval(() => {
        const seconds = get(gameTime)
        gameTime.set(seconds + 1)
    }, 1000)
    return Promise.resolve() //robotsGame
})*/
//.then(() => Promise.reject())
//.catch(err => {
    //clearInterval(gameTimeCounter)
//})
/*
function getRandomItem(){
    const r = Math.floor(Math.random() * dictionary.length)
    return new MorphominoItem(dictionary[r])
}

function getRandomItems(){
    return new Array(8)
        .fill(0)
        .map(el => getRandomItem())
}

function replaceItem(cards, n) {
    return cards.map((el, i) => i === n ? getRandomItem() : el)
}

function replaceForFirst(n) {
    firstPlayer.set(replaceItem(get(firstPlayer), n))
}

function replaceForSecond(n) {
    firstPlayer.set(replaceItem(get(secondPlayer), n))
}

export { 
    firstPlayer, 
    secondPlayer, 
    gameFlow, 
    alertMessage, 
    scores,
    gameTime,
    gameOver,
    gameTimeCounter,
    hashHolder,
    replaceForFirst, 
    replaceForSecond, 
    showAlert, 
    resetForFirst,
    makeMove,
    findNextPos,
    startGame 
}
*/

