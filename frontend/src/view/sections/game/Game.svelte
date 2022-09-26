<script lang="ts">
    import Instruction from './Instruction.svelte';
    import LevelCurrent from './LevelCurrent.svelte'
    import { GameStages } from '../../../model'
    import { stage } from '../../../controller/game'

    export let id: string
</script>

<LevelCurrent />

<div class="game-holder">
    {#if $stage === GameStages.UNDEFINED}
        <div />
    {:else if $stage === GameStages.INSTRUCTION}
        <Instruction {id} />
    {:else}
    OK!!!
    {/if}
</div>

<style>
    .game-holder {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
