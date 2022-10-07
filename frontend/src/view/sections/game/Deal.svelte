<script>
    import { onMount } from 'svelte'
    import { MorminoItem } from '../../../model'
    import MorminoWord from '../../components/MorminoWord.svelte'
    import { makeMove, deal } from '../../../controller/flow'

    let audioClick

    function checkCard(event, item, index){
        const status = makeMove(item)
        if(!status) return
        const dealDiv = event.target.closest('.mormino-deal')
        const cards = dealDiv.querySelectorAll('.mormino-card')
        cards.forEach(div => div.classList.remove('faded-card'))
        const card = cards[index]
        card.classList.add('faded-card')
        try {
            audioClick.play()
        }
        catch(e){console.log('Audio is disabled.')}
        setTimeout(() => {
            deal.set([...$deal.filter((_, i) => i < index), MorminoItem.getRandomItem(), ...$deal.filter((_, i) => i > index)])
        }, 900);
    }

    //onMount($=> {
//        dealRandom()
    //})
</script>

<audio bind:this={audioClick}>
    <source src="./assets/audio/click.mp3" type="audio/mpeg">
</audio>

<div class="mormino-deal">
    {#each $deal as item, index}
        <div class="mormino-card" on:click={event => checkCard(event, item, index)}>
            <MorminoWord word={item.word} vignette={1}/>
        </div>
    {/each}
</div>

<style>
    :root{
        --mormino-deal-max-width: 1000px;
        --mormino-deal-card-width: calc(var(--mormino-deal-max-width) / 4 - 3px);
        --mormino-deal-card-height: calc(var(--mormino-card-width) / 1.618);
    }
    .mormino-card {
        width: var(--mormino-deal-card-width);
        height: var(--mormino-deal-card-height);
        cursor: pointer;
        background-color: beige;
        margin-bottom: 4px;
    }

    .mormino-deal {
        max-width: var(--mormino-deal-max-width);
        margin: 3rem auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

</style>