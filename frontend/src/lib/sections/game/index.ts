import { get } from 'svelte/store'
import { GameStages, MorminoItem, MoveStatuses, GamerRoles } from '../../types'
import { stage, ignoreInstruction, instructionTimeout, dealTimeout, role, moves, alert, flow } from '../../store'
import { delayedAction } from '../../util'

export async function startGame(){
    await delayedAction(5000)
    if(!ignoreInstruction){
        stage.set(GameStages.INSTRUCTION)
        await delayedAction(instructionTimeout)
    }
    stage.set(GameStages.DEAL)
    await delayedAction(dealTimeout)
    stage.set(GameStages.FLOW)
}

function showAlert(msg){
    alert.set(msg)
    setTimeout(() => alert.set(''), 3000)
}

export function makeMove(item: MorminoItem, $role = get(role)): boolean {
    const $flow = get(flow)
    if(!$flow.length) return false
    const lastCard = $flow.at(-1)
    if(!lastCard.isCongeneric(item)){
        showAlert(`"${item.word}" - это не ${lastCard.nextNomenative}.`)
        return false
    } 
    const $moves = get(moves)
    const lastIndex = $flow.length - 1
    moves.set([...$moves.slice(0, lastIndex), MoveStatuses.HOST_IS_WON, ...$moves.slice(lastIndex + 1)])
    flow.set([...$flow, item])
    return true
}