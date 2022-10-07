<script type="ts">
    import { derived } from 'svelte/store';
    import { scores } from '../../controller/flow'
    import { gameOver, breakGame, elapsed, elapsedWithUnits } from '../../controller/tickers'
    import { startGame } from '../../controller/game'
    import ChangeLevel from './ChangeLevel.svelte';

    const scoresSlashed = derived(scores, ([won, all]) => `${won}/${all}`)
</script>

<ul class="navbar-nav navbar-ul-long-fixed-width">
    <li class="nav-item text-light">
        <span>Время игры:</span>
        <strong>{$elapsedWithUnits}</strong>
    </li>
</ul>
<ul class="navbar-nav navbar-ul-long-fixed-width">
    <li class="nav-item  text-light">
        <span>Правильных ответов:</span>
        <strong>{$scoresSlashed}</strong>
    </li>
</ul>
<ChangeLevel label="Сменить уровень" />
{#if $gameOver }
    <button class="btn btn-success navbar-button-fixed-width" on:click={startGame}>Новая игра</button>
{:else}    
    <button class="btn btn-secondary navbar-button-fixed-width" on:click={breakGame}>Прервать игру</button>
{/if}
