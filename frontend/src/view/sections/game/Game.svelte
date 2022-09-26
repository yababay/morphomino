<script lang="ts">
    import Instruction from './Instruction.svelte';
    import Deal from './Deal.svelte'
    import Flow from './Flow.svelte'
    import LevelCurrent from './LevelCurrent.svelte'
    import { GameStages, MorminoItem } from '../../../model'
    import { stage } from '../../../controller/game'
    import { onMount } from 'svelte';
    import { hash } from '../../../controller/router'
    import { startGame, breakGame } from '../../../controller/game'
    import { gameSectionId } from '../../../../settings.json'
    import { flow } from '../../../controller/flow'

    export let id: string

    onMount(() => {
        flow.set([MorminoItem.getRandomItem()])
        hash.subscribe(value => {
            if(value === gameSectionId) startGame()
            else breakGame()
        })
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
        <p>break</p>
    {:else if $stage === GameStages.HOST_IS_WON}
        <p>host</p>
    {:else if $stage === GameStages.GUEST_IS_WON}
        <p>guest</p>
    {:else if $stage === GameStages.DEAD_HEAT}
        <p>dh</p>
    {:else if $stage === GameStages.FULFILLED}
        <p>full</p>
    {:else if $stage === GameStages.TIMEOUT}
        <p>time</p>
    {:else}
        <div />
    {/if}
</div>

<div /><!-- dummy -->

<style>
    .game-holder {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
