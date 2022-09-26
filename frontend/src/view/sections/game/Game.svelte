<script lang="ts">
    import Instruction from './Instruction.svelte';
    import LevelCurrent from './LevelCurrent.svelte'
    import { GameStages } from '../../../model'
    import { stage } from '../../../controller/game'

    export let id: string
</script>

<LevelCurrent />

<div class="game-holder">
    {#if $stage === GameStages.INSTRUCTION}
        <Instruction {id} />
    {:else if $stage === GameStages.SETUP}
        <p>setup</p>
    {:else if $stage === GameStages.FLOW}
        <p>flow</p>
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

<div /><!-- dummy -->>

<style>
    .game-holder {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
