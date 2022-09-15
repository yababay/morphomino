<script>
import MorphominoCard from './MorphominoCard.svelte';
import { gameFlow } from './store'

</script>

<section class="game-flow">
    {#each $gameFlow.slice(-2) as item, index}
        <MorphominoCard {item} {index} />
    {/each}
</section>

<style>
    .game-flow {
        max-width: 1200px;
        margin: 3rem auto;
        display: flex;
        justify-content: center;
}
</style>