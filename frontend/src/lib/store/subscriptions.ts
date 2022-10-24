import { get, derived, type Readable, type Writable } from "svelte/store"
import { setup as setupTicker } from '../components/sections/game/ticker'
import { GameStages, gameOver } from '../types'
import { elapsed, stage, isFullfilled, scores } from './derivatives'
import { duration, achievements } from '.'

const stopTicker = setupTicker(elapsed)
let isGame: Readable<boolean>

export function getIsGame(){
    return isGame
}

export default function(hash: Writable<string>){

    isGame = derived(hash, $hash => $hash.startsWith('#game'))

    isGame.subscribe((yes: boolean) => {
        const footer = document.querySelector('footer')
        document.body.style.backgroundImage = yes ? 'url(./img/background.png)' : null
        if(yes) footer.classList.add('text-light')
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
        if(gameOver($stage) && $stage !== GameStages.UNDEFINED) {
            stopTicker()
            const [won, all] = get(scores)
            const date = new Date().getTime()
            const achievement = {date, elapsed: get(elapsed), duration: get(duration), scores: won, moves: all, reason: get(stage)}
            const currentAchievements = get(achievements)
            if(Array.isArray(currentAchievements)) achievements.set([achievement, ...currentAchievements])
        }
    })
}
