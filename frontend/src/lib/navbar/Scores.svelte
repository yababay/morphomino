<script lang="ts">
    import { derived } from "svelte/store";
    import { stage, elapsed, elapsedWithUnits } from '../sections/game/tickers'
    import startGame from '../sections/game/game'
    import { scores } from '../sections/game/flow'
    import { GameStages, GAME_ENDINGS } from '../types'
    import Levels from './Levels.svelte'

    const scoresSlashed = derived(scores, ([won, all]) => `${won}/${all}`);
    let audioDeal: HTMLAudioElement

    function playSound() {
        audioDeal.play();
    }
</script>

<audio bind:this={audioDeal}>
    <source src="./audio/deal.mp3" type="audio/mpeg" />
</audio>

{#if $elapsed > 0}
    <ul class="navbar-nav navbar-ul-long-fixed-width">
        <li class="nav-item text-light">
            <span>Прошло &nbsp;</span>
            <strong>{$elapsedWithUnits}</strong>
        </li>
    </ul>

    <ul class="navbar-nav navbar-ul-long-fixed-width">
        <li class="nav-item  text-light">
            <span>Решено &nbsp;</span>
            <strong>{$scoresSlashed}</strong>
        </li>
    </ul>
{/if}

<Levels label="Сменить уровень" />

{#if GAME_ENDINGS.includes($stage)}
    <button
        class="btn btn-success navbar-button-fixed-width"
        on:click={async e => {playSound();await startGame()}}>Новая игра</button
    >
{:else}
    <button
        class="btn btn-secondary navbar-button-fixed-width"
        on:click={$=> stage.set(GameStages.BREAK)}>Прервать игру</button
    >
{/if}
