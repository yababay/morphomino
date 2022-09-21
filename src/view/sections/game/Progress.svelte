<script>
    import { moves, role } from '../../../controller/flow'
    import { GamerRoles, MoveStatuses } from '../../../model'
    import ProgressDown from './ProgressDown.svelte';
    import ProgressUp from './ProgressUp.svelte';
</script>

<div class="progress-holder">
    {#each [...$moves].reverse().filter($=> $ != MoveStatuses.FORTHCOMING ) as move}
        <div class="mormino-score" style:color={$role === GamerRoles.HOST ? 'green' : 'red'}>
            {#if $role === GamerRoles.HOST && move === MoveStatuses.HOST_IS_WON }
                <ProgressUp />
            {:else if $role === GamerRoles.HOST && move === MoveStatuses.HOST_IS_WRONG }
                <ProgressDown />
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