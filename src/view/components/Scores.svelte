<script>
    import { GameStages } from '../../model';
    import { breakGame, scores, elapsedTime, stage, startGame } from '../../controller/game'
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
{#if $stage === GameStages.END}
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