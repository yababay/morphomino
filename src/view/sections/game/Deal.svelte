<script>
    import { onMount } from 'svelte'
    import { MorminoItem } from '../../../model'
    import MorminoWord from '../../components/MorminoWord.svelte'
    import { makeMove, deal, setRandomItems } from '../../../controller/flow'

    function checkCard(item, index){
        const status = makeMove(item)
        if(!status) return
        deal.set([...$deal.filter((_, i) => i < index), MorminoItem.getRandomItem(), ...$deal.filter((_, i) => i > index)])
    }

    onMount($=> setRandomItems())
</script>

<div class="mormino-deal">
    {#each $deal as item, index}
        <div class="mormino-card" on:click={_=> checkCard(item, index)}>
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
        height: calc(var(--mormino-card-width) / 1.618);
        cursor: pointer;
    }

    .mormino-deal {
        max-width: var(--mormino-max-deal-width);
        margin: 3rem auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
</style>