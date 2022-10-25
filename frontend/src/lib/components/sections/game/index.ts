import { get, type Readable } from 'svelte/store'
import { setSvelteComponent, delayedAction } from '../../../util'
import { 
    role, flow, moves, alert, stage, instructionTimeout, 
    dealTimeout, ignoreInstruction,
    movesAmount, dealAmount, deal 
} from '../../../store'
import { MoveStatuses, MorminoItem, GameStages  } from '../../../types'
import { startTicker, stopTicker } from './ticker'
import Game from './index.svelte'

export { stopTicker }

export async function startGame(){
    stage.set(GameStages.LOADING)
    if(!get(ignoreInstruction)){
        stage.set(GameStages.INSTRUCTION)
        await delayedAction(instructionTimeout)
    }
    resetMoves()
    stage.set(GameStages.DEAL)
    await delayedAction(dealTimeout)
    stage.set(GameStages.FLOW) 
    startTicker()   
}

export function dealRandom(){
    deal.set(new Array(dealAmount).fill(0).map(()=> MorminoItem.getRandomItem()))
}

export function resetMoves(){
    dealRandom()
    moves.set(new Array(get(movesAmount)).fill(MoveStatuses.FORTHCOMING))
    flow.set([MorminoItem.getRandomItem()])
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
        if(target.getAttribute('id') !== 'game'){ 
            stage.set(GameStages.BROKEN)
            return
        }
        gameSection.innerHTML = ''
        setSvelteComponent(Game, target, props)
    })
}
