import { get, type Readable, type Writable } from "svelte/store"
import { setup as setupTicker } from '../sections/game/ticker'
import { GameStages, gameOver } from '../types'
import { elapsed, stage, isFullfilled, scores } from './derivatives'
import { duration, achievements } from '../sections/settings'
import Game from '../sections/game/index.svelte'
import { setSvelteComponent } from "../util"

const stopTicker = setupTicker(elapsed)

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
        document.body.style.backgroundImage = $hash.startsWith('#game') ? 'url(./img/background.png)' : null
    })

    /*
    isFullfilled.subscribe($yes => {if($yes) stage.set(GameStages.FULFILLED)})

    stage.subscribe($stage => {
        if(gameOver($stage)) stopTicker()
    })

    elapsed.subscribe($elapsed => {
        const $duration = get(duration)
        if(typeof $duration === 'number' && $elapsed > $duration){
            elapsed.set($duration)
            stage.set(GameStages.TIMEOUT)
        }
    })

    stage.subscribe($stage => {
        if(gameOver($stage)) {
            const [won, all] = get(scores)
            const date = new Date().getTime()
            const achievement = {date, elapsed: get(elapsed), duration: get(duration), scores: won, moves: all, reason: get(stage)}
            const currentAchievements = get(achievements)
            if(Array.isArray(currentAchievements)) achievements.set([achievement, ...currentAchievements])
        }
    })
    */
}
