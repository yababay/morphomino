<script lang="ts">
    import { hideElement, showElement } from '@yababay67/svelte-hash-router-ts'
    import { delayedAction } from '../../util'
    import { level as levelStore } from '../settings/settings'
    import { stage } from './tickers'
    import { startGame } from './game'
    import { GameStages, GAME_ENDINGS } from '../../types'
    import loadLevel from './loader'
    import CurrentLevel from '../../navbar/CurrentLevel.svelte'
    import Finish from './Finish.svelte'
    import Instruction from './Instruction.svelte'
    import Deal from './Deal.svelte'
    import Flow from './Flow.svelte'

    export let level: string = ""

    if(!level) level = `${$levelStore}`
    else levelStore.set(level)

    const loaderCard = document.querySelector('#loader .card')
    const loaderImage = loaderCard.querySelector('img')

    export const loader = async ()=> {
        hideElement(loaderCard)
        loaderImage.setAttribute('src', `./img/level-${level}.png`)        
        await delayedAction(200)
        showElement(loaderCard)
        await loadLevel(level)
        await delayedAction(2000)
        startGame()
    }
</script>

<div class="game-holder">
    <!-- CurrentLevel / -->
    {#if GAME_ENDINGS.includes($stage)}
        <Finish />
    {:else if $stage === GameStages.INSTRUCTION}
        <Instruction />
    {:else if $stage === GameStages.DEAL}
        <Deal />
    {:else if $stage === GameStages.FLOW}
        <Deal />
        <Flow />
    {/if}
    <div>&nbsp;</div>
</div>

<style>
    .game-holder {
        min-height: var(--main-min-height); 
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
</style>

