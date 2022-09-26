<script lang="ts">
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
    import { flow } from '../../../controller/flow'

    export let id: string

    onMount(() => {
        flow.set([MorminoItem.getRandomItem()])
        hash.subscribe(value => {
            if(value === gameSectionId) startGame()
            else breakGame()
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

<div /><!-- dummy -->

<style>
    .game-holder {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
