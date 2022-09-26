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

function showAlert(msg){
    alert.set(msg)
    setTimeout(() => alert.set(''), 4000)
}

export { moves, flow, role, scores, deal, alert, setRandomItems, makeMove }
