<script type="ts">
    import { derived } from 'svelte/store';
    import { scores } from '../../controller/flow'
    import { gameOver, breakGame, elapsed } from '../../controller/tickers'
    import { getTimeWithUnits } from '../../controller/util'
    import { startGame } from '../../controller/game'
    import ChangeLevel from './ChangeLevel.svelte';

    const elapsedWithUnits = derived(elapsed, $elapsed => {
        const [minutes, seconds, minUnitCase, secUnitCase] = getTimeWithUnits($elapsed, true)
        const mins = minutes > 0 ? `${minutes} ${minUnitCase} ` : ''
        const secs = `${seconds} ${secUnitCase}`
        return `${mins}${secs}`
    })

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
