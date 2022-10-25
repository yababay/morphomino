import { get, derived, type Readable, type Writable } from "svelte/store"
import { setup as setupTicker } from '../components/sections/game/ticker'
import { GameStages, gameOver } from '../types'
import { elapsed, stage, isFullfilled, scores } from './derivatives'
import { duration, achievements, level } from '.'
import loadLevel from '../components/loader'

const stopTicker = setupTicker(elapsed)
let isGame: Readable<boolean>

export function getIsGame(){
    return isGame
}

export default function(hash: Writable<string>){

    level.subscribe(async $level => await loadLevel($level))

    isGame = derived(hash, $hash => $hash.startsWith('#game'))

    isGame.subscribe((yes: boolean) => {
        const footer = document.querySelector('footer')
        document.body.style.backgroundImage = yes ? 'url(./img/background.png)' : null
        if(yes) footer.classList.add('text-light')
        else footer.classList.remove('text-light')
    })

    elapsed.subscribe($elapsed => {
        let $duration = get(duration)
        if(typeof $duration !== 'number') return
        $duration = Math.floor($duration / 60) * 60
        if($elapsed > $duration){
            elapsed.set($duration)
            stage.set(GameStages.TIMEOUT)
        }
    })

    isFullfilled.subscribe($yes => {if($yes) stage.set(GameStages.FULFILLED)})

    stage.subscribe($stage => {
        if(gameOver($stage) && $stage !== GameStages.UNDEFINED && $stage !== GameStages.BROKEN) {
            stopTicker()
            const [won, all] = get(scores)
            const date = new Date().getTime()
            const achievement = {date, level: get(level), elapsed: get(elapsed), duration: get(duration), scores: won, moves: all, reason: get(stage)}
            const currentAchievements = get(achievements)
            if(Array.isArray(currentAchievements)) achievements.set([achievement, ...currentAchievements])
        }
    })
}
