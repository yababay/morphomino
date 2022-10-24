import { get, type Readable } from 'svelte/store'
import { setSvelteComponent, delayedAction } from '../../../util'
import { role, flow, moves, alert, stage, instructionTimeout, dealTimeout, ignoreInstruction } from '../../../store'
import { MoveStatuses, MorminoItem, GameStages  } from '../../../types'
import { startTicker } from './ticker'
import loadLevel from '../../loader'
import Game from './index.svelte'

export async function startGame(){
    stage.set(GameStages.LOADING)
    await loadLevel()
    if(!get(ignoreInstruction)){
        stage.set(GameStages.INSTRUCTION)
        await delayedAction(instructionTimeout)
    }
    stage.set(GameStages.DEAL)
    await delayedAction(dealTimeout)
    stage.set(GameStages.FLOW) 
    startTicker()   
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

function showAlert(msg){
    alert.set(msg)
    setTimeout(() => alert.set(''), 3000)
}

const gameSection = document.getElementById('game')

export default function (propsStore: Readable<any>){
    propsStore.subscribe(arg => {
        const { target, props } = arg
        if(target.getAttribute('id') !== 'game') return
        gameSection.innerHTML = ''
        setSvelteComponent(Game, target, props)
    })
}
