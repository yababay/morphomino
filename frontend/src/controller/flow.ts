import { writable, get, derived } from 'svelte/store'
import { GamerRoles, MoveStatuses, MorminoItem } from '../model'
import { minMoveTimeout, dealAmount } from '../../settings.json'
import { moviesAmount, durationInSeconds } from './settings'

const moves = writable(getInitialMoves())
const flow = writable([])
const lastStatus = derived(moves, $moves => $moves.find(el => el !== MoveStatuses.FORTHCOMING) || MoveStatuses.FORTHCOMING)
const role = writable(GamerRoles.HOST)
const alert = writable('')
const deal = writable([])

const scores = derived(moves, $moves => {
    const scores = $moves.filter(el => 
        get(role) === GamerRoles.HOST && el === MoveStatuses.HOST_IS_WON 
        || 
        get(role) === GamerRoles.GUEST && el === MoveStatuses.GUEST_IS_WON 
        ).length
    return `${scores}/${$moves.length}`
})

function getInitialMoves(){
    return new Array(get(moviesAmount)).fill(MoveStatuses.FORTHCOMING)
}

function setRandomItems(){
    deal.set(getRandomItems())
}

function getRandomItems(){
    return new Array(dealAmount).fill(0).map($=> MorminoItem.getRandomItem())
} 

function makeMove(item){
    return false
}

export { moves, flow, role, scores, deal, setRandomItems, makeMove }
