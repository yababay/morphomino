<script>
    import { derived } from 'svelte/store'
    import { moves, role } from '../../../controller/flow'
    import { GamerRoles, MoveStatuses } from '../../../model'
    import Forthcoming from './Forthcoming.svelte';
    import ProgressDown from './ProgressDown.svelte';
    import ProgressUp from './ProgressUp.svelte';

    const reversed = derived(moves, _moves => {
        const future = _moves.filter(el => el === MoveStatuses.FORTHCOMING)
        const past = _moves.filter(el => el !== MoveStatuses.FORTHCOMING).reverse()
        return [...past, ...future]
    })

    function getMoveColor(move){
        switch(move){
            case MoveStatuses.HOST_IS_WON: return 'green'
            case MoveStatuses.GUEST_IS_WON: return 'orange'
            default: return 'grey'
        }
    }
</script>

<div class="progress-holder">
    {#each $reversed as move}
        <div class="mormino-score" style:color={getMoveColor(move)}>
            {#if $role === GamerRoles.HOST && move === MoveStatuses.HOST_IS_WON }
                <ProgressUp />
            {:else if $role === GamerRoles.HOST && move === MoveStatuses.HOST_IS_WRONG }
                <ProgressDown />
            {:else if move === MoveStatuses.FORTHCOMING }
                <Forthcoming />
            {/if}
        </div>
    {/each}
</div>

<style>
    .mormino-score {
        margin: 0 6px 6px 0;
    }

    .progress-holder {
        display: flex;
        flex-wrap: wrap;
    }
</style>