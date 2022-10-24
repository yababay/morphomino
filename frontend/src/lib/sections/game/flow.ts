import { GameStages } from '../../types'
import { stage } from '../../store'

export function breakGame(){
    stage.set(GameStages.BROKEN)
}

/*import { writable, get } from 'svelte/store'
import { MoveStatuses, MorminoItem, GamerRoles } from '../../types'
import { movesAmount } from '../settings'
import { dealAmount } from '../../../settings/settings.json'


function resetFlow(){
    const emptyMoves = new Array(get(movesAmount)).fill(MoveStatuses.FORTHCOMING)
    moves.set(emptyMoves)
    flow.set([MorminoItem.getRandomItem()])
    dealRandom()
}

function dealRandom(){
    deal.set(new Array(dealAmount).fill(0).map($=> MorminoItem.getRandomItem()))
}

function makeMove(item: MorminoItem, $role = get(role)): boolean {
    const $flow = get(flow)
    if(!$flow.length) return false
    const lastCard = $flow.at(-1)
    if(!lastCard.isCongeneric(item)){
        showAlert(`"${item.word}" - это не ${lastCard.nextNomenative}.`)
        return false
    } 
    const status = $role === GamerRoles.HOST && MoveStatuses.HOST_IS_WON || MoveStatuses.GUEST_IS_WON
    const $moves = get(moves)
    const lastIndex = $flow.length - 1
    moves.set([...$moves.slice(0, lastIndex), status, ...$moves.slice(lastIndex + 1)])
    flow.set([...$flow, item])
    //if(get(isFullfilled)) setFullfilled()
    if($role === GamerRoles.HOST) return status === MoveStatuses.HOST_IS_WON 
    return status === MoveStatuses.GUEST_IS_WON
}

function showAlert(msg){
    alert.set(msg)
    setTimeout(() => alert.set(''), 3000)
}

export { scores, resetFlow, scoresVerbose, 
    deal, makeMove, flow, dealRandom, moves, role, alert,
    breakGame, stage
}
*/