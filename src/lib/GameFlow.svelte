<script>
import MorphominoCard from './MorphominoCard.svelte';
import { gameFlow, resetForFirst } from './store'

</script>

<section class="game-flow">
    {#each $gameFlow.slice(-2) as item, index}
        <MorphominoCard {item} {index} />
    {/each}
    <button class="btn btn-primary reset-button" on:click={resetForFirst}>Обновить</button>
</section>

<style>
    .reset-button {
        margin: 60px 0 60px 120px;
    }
    .game-flow {
        max-width: 1200px;
        margin: 3rem auto;
        display: flex;
        justify-content: center;
}
</style>