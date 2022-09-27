<script type="ts">
    import { derived } from 'svelte/store'
    import { GameStages } from '../../model'
    import { scores } from '../../controller/flow'
    import { elapsedTime, stage } from '../../controller/ticker'
    import { startGame, breakGame } from '../../controller/game'

    const gameOver = derived(stage, $stage => 
        [
            GameStages.UNDEFINED, 
            GameStages.BREAK, 
            GameStages.TIMEOUT, 
            GameStages.FULFILLED, 
            GameStages.DEAD_HEAT, 
            GameStages.GUEST_IS_WON, 
            GameStages.HOST_IS_WON
        ].includes($stage)
    )
</script>

<div class="holder">
    <ul class="navbar-nav">
        <li class="nav-item text-light">
            <strong>Время игры:</strong>
            <span>{$elapsedTime}</span>
        </li>
    </ul>
    <ul class="navbar-nav">
        <li class="nav-item  text-light">
            <strong>Правильных ответов:</strong>
            <span>{$scores}</span>
        </li>
    </ul>
    {#if $gameOver }
        <button class="btn btn-success fixed-width" on:click={startGame}>Новая игра</button>
    {:else}    
        <button class="btn btn-secondary fixed-width" on:click={breakGame}>Прервать игру</button>
    {/if}
</div>

<style>
    .holder {
        width: 640px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .fixed-width {
        width: 10rem;
    }
</style>
