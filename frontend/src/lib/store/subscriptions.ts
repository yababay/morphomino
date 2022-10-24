import { get, type Readable, type Writable } from "svelte/store"
import { setup as setupTicker } from '../sections/game/ticker'
import { GameStages, gameOver, MoveStatuses, MorminoItem } from '../types'
import { elapsed, stage, isFullfilled, scores, moves, flow, deal } from './derivatives'
import { duration, achievements, movesAmount, dealAmount } from '../sections/settings'
import Game from '../sections/game/index.svelte'
import { setSvelteComponent } from "../util"

const stopTicker = setupTicker(elapsed)

export function randomDeal(){
    deal.set(new Array(dealAmount).fill(0).map(()=> MorminoItem.getRandomItem()))
}

export default function(hash: Writable<string>, props: Readable<any>){

    props.subscribe($props => {
        stopTicker()
        const {target, props} = $props
        if(target.getAttribute('id') !== 'game') {
            return
        }
        target.innerHTML = ''
        setSvelteComponent(Game, target, props)
    })

    hash.subscribe(($hash: string) => {
        const isGame = $hash.startsWith('#game')
        const footer = document.querySelector('footer')
        document.body.style.backgroundImage = isGame ? 'url(./img/background.png)' : null
        if(isGame) footer.classList.add('text-light')
        else footer.classList.remove('text-light')
    })

    elapsed.subscribe($elapsed => {
        const $duration = get(duration)
        if(typeof $duration === 'number' && $elapsed > $duration){
            elapsed.set($duration)
            stage.set(GameStages.TIMEOUT)
        }
    })

    isFullfilled.subscribe($yes => {if($yes) stage.set(GameStages.FULFILLED)})

    stage.subscribe($stage => {
        if($stage === GameStages.LOADING){
            moves.set(new Array(get(movesAmount)).fill(MoveStatuses.FORTHCOMING))
            flow.set([MorminoItem.getRandomItem()])
            randomDeal()
        }
        if(gameOver($stage)) {
            stopTicker()
            const [won, all] = get(scores)
            const date = new Date().getTime()
            const achievement = {date, elapsed: get(elapsed), duration: get(duration), scores: won, moves: all, reason: get(stage)}
            const currentAchievements = get(achievements)
            if(Array.isArray(currentAchievements)) achievements.set([achievement, ...currentAchievements])
        }
    })
}
