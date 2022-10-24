<script lang="ts">
    import { onMount } from 'svelte'
    import { level as levelStore, stage } from '../../../store'
    import { GameStages } from '../../../types'
    import Instruction from './Instruction.svelte'
    import Deal from './Deal.svelte'
    import Flow from './Flow.svelte'
    import Finish from './Finish.svelte'
    import { startGame } from '.'

    export let level: string = ''

    if(!level) level = `${$levelStore}`
    else levelStore.set(level)

    onMount(async () => {
        await startGame()
    })
</script>

<div class="game-holder text-light">
    {#if [GameStages.LOADING, GameStages.UNDEFINED].includes($stage) }
        <p></p>
    {:else if $stage === GameStages.INSTRUCTION}
        <Instruction />
    {:else if $stage === GameStages.DEAL}
        <Deal />
    {:else if $stage === GameStages.FLOW}
        <Deal />
        <Flow />
    {:else}
        <Finish />
    {/if}
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

