<script>
    import MorphominoCard from "./MorphominoCard.svelte"
    import { firstPlayer } from './store'
</script>

<section class="morphomino-set">
    {#each $firstPlayer as item, index}
        <MorphominoCard {item} {index} />
    {/each}
</section>

<style>
    .morphomino-set {
        max-width: 1200px;
        margin: 3rem auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>

