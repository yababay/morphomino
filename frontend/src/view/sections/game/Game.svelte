<script lang="ts">
    import { startGame, breakGame } from "../../../controller/game";
    import { gameOver } from "../../../controller/tickers";
    import CurrentLevel from "./CurrentLevel.svelte"
    import Finish from "./Finish.svelte"

    let busy = false

    export const onShow = async () => {
        document.body.style.backgroundImage = 'url(./assets/img/background.png)'
        await startGame()
    }

    export const onHide = () => {
        breakGame()
        document.body.style.backgroundImage = null
    }
</script>
<div class="game-holder">
    <CurrentLevel />
    {#if $gameOver}
        <Finish />
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
<!-- script lang="ts">
    import Instruction from './Instruction.svelte';
    import Deal from './Deal.svelte'
    import Alert from './Alert.svelte'
    import Flow from './Flow.svelte'
    import Finish from './Finish.svelte'
    import LevelCurrent from './LevelCurrent.svelte'
    import { GameStages, MorminoItem } from '../../../model'
    import { stage } from '../../../controller/game'
    import { onMount } from 'svelte';
    import { hash } from '../../../controller/router'
    import { startGame, breakGame } from '../../../controller/game'
    import { gameSectionId } from '../../../../settings.json'

    export let id: string

    onMount(() => {
        hash.subscribe(value => {
            if(value === gameSectionId) {
                document.body.classList.add('bg-dark')
                startGame()
            }
            else {
                document.body.classList.remove('bg-dark')
                breakGame()
            }
        })
        new Alert({target: document.getElementById('alert')})
    })
</script>

<LevelCurrent />

<div class="game-holder">
    {#if $stage === GameStages.INSTRUCTION}
        <Instruction {id} />
    {:else if $stage === GameStages.DEAL}
        <Deal />
    {:else if $stage === GameStages.FLOW}
        <Deal />
        <Flow />
    {:else if $stage === GameStages.BREAK}
        <Finish mode={GameStages.BREAK} />
    {:else if $stage === GameStages.HOST_IS_WON}
        <Finish mode={GameStages.BREAK} />
    {:else if $stage === GameStages.GUEST_IS_WON}
        <Finish mode={GameStages.GUEST_IS_WON} />
    {:else if $stage === GameStages.DEAD_HEAT}
        <Finish mode={GameStages.DEAD_HEAT} />
    {:else if $stage === GameStages.FULFILLED}
        <Finish mode={GameStages.FULFILLED} />
    {:else if $stage === GameStages.TIMEOUT}
        <Finish mode={GameStages.TIMEOUT} />
    {:else}
        <div />
    {/if}
</div>

<div />

<style>
    .game-holder {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style -->
