<script>
    import { MorminoItem } from '../../../model'
    import MorminoWord from '../../components/MorminoWord.svelte'
    import { writable } from 'svelte/store'
    import { dealAmount } from '../../../settings.json'

    const deal = writable(new Array(dealAmount).fill(0).map(_ => MorminoItem.getRandomItem()))
</script>

<div class="mormino-deal">
    {#each $deal as item}
        <div class="mormino-card">
            <MorminoWord word={item.word} vignette={1}/>
        </div>
    {/each}
</div>

<style>
    :root{
        --mormino-max-deal-width: 1000px;
        --mormino-card-width: calc(var(--mormino-max-deal-width) / 4 - 3px);
    }
    .mormino-card {
        width: var(--mormino-card-width);
        height: calc(var(--mormino-card-width) / 1.618)
    }

    .mormino-deal {
        max-width: var(--mormino-max-deal-width);
        margin: 3rem auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
</style>