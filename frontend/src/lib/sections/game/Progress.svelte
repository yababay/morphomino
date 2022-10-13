<script type="ts">
    import { derived } from 'svelte/store'
    import { moves, role } from './flow'
    import { GamerRoles, MoveStatuses } from '../../types'
    import ProgressForth from './ProgressForth.svelte'
    import ProgressDown from './ProgressDown.svelte';
    import ProgressUp from './ProgressUp.svelte';

    const reversed = derived(moves, $moves => {
        const future = $moves.filter(el => el === MoveStatuses.FORTHCOMING)
        const past = $moves.filter(el => el !== MoveStatuses.FORTHCOMING).reverse()
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
                <ProgressForth />
            {/if}
        </div>
    {/each}
</div>

<style>
    .mormino-score {
        margin: 0 5px 0 0;
        height: 21px;
    }

    .progress-holder {
        display: flex;
        flex-wrap: wrap;
    }
</style>
