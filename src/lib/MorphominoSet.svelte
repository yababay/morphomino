<script>
    import { MorphominoItem } from './parts-of-speech'
    import MorphominoCard from "./MorphominoCard.svelte"
    import { words } from './store'

    let toggle = false

    function updateCard(){
        words.set(
            toggle ?
            'Я из лесу вышел был сильный мороз брр'.split(' ')
            :
            'Однажды в студеную зимнюю пору вах вах вах'.split(' ')
        )
        toggle = !toggle
    }
</script>

<div>
    <button on:click={updateCard}>Обновить</button>
</div>
<section class="morphomino-set">
    {#each $words as word}
        <MorphominoCard item={ new MorphominoItem(word)} />
    {/each}
</section>

<style>
    .morphomino-set {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>

