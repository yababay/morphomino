<script lang="ts">
    import Instruction from './Instruction.svelte';
    import LevelCurrent from './LevelCurrent.svelte'

    export let id: string
</script>

<LevelCurrent />

<div class="game-holder">
    <Instruction {id} />
</div>

<div />

<style>
    .game-holder {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
