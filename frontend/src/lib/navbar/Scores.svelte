<script lang="ts">
    import { gameOver, GameStages } from '../types'
    import Levels from './Levels.svelte'
    import CurrentLevel from './CurrentLevel.svelte'
    import { scoresSlashed, elapsed, elapsedWithUnits, stage } from '../store'

    let audioDeal: HTMLAudioElement

    function startGame(){
        audioDeal.play();
        stage.set(GameStages.LOADING)
    }

    function breakGame(){
        stage.set(GameStages.BROKEN)
    }

</script>

<audio bind:this={audioDeal}>
    <source src="./audio/deal.mp3" type="audio/mpeg" />
</audio>

{#if $elapsed > 0}
    <div class="ms-3">
        <ul class="navbar-nav ms-3">
            <li class="nav-item text-light">
                <span>Прошло &nbsp;</span>
                <strong>{$elapsedWithUnits}</strong>
            </li>
        </ul>
    </div>

    <div class="ms-3">
        <ul class="navbar-nav ms-3">
            <li class="nav-item  text-light">
                <span>Решено &nbsp;</span>
                <strong>{$scoresSlashed}</strong>
            </li>
        </ul>
    </div>
{/if}

<div class="ms-3">
    <CurrentLevel />
</div>

<div class="ms-3">
    <Levels label="Сменить уровень" />
</div>

{#if gameOver($stage)}
    <div class="ms-3">
        <button
            class="btn btn-success navbar-button-fixed-width"
            on:click={startGame}>Новая игра</button>
    </div>
{:else}
    <div class="ms-3">
        <button
            class="btn btn-secondary navbar-button-fixed-width"
            on:click={breakGame}>Прервать игру</button>
    </div>
{/if}
