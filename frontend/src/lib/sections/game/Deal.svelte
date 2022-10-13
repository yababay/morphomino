<script>
    import { MorminoItem } from '../../types'
    import { makeMove, deal } from './flow'
    import { backgroundColor } from '../settings/settings'
    import MorminoWord from '../../components/MorminoWord.svelte'

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
</script>

<audio bind:this={audioClick}>
    <source src="./audio/click.mp3" type="audio/mpeg">
</audio>

<div class="mormino-deal">
    {#each $deal as item, index}
        <div class="mormino-card" on:click={event => checkCard(event, item, index)} style:background-color={$backgroundColor + ''}>
            <MorminoWord word={item.word} vignette={1}/>
        </div>
    {/each}
</div>

<style>
    :root{
        --mormino-deal-max-width: 1000px;
        --mormino-deal-card-width: calc(var(--mormino-deal-max-width) / 4 - 10px);
        --mormino-deal-card-height: calc(var(--mormino-card-width) / 1.618);
    }
    .mormino-card {
        width: var(--mormino-deal-card-width);
        height: var(--mormino-deal-card-height);
        cursor: pointer;
        margin: 5px;
        border-radius: 10px;
        box-shadow: 2px 2px 2px black;
    }

    .mormino-deal {
        max-width: var(--mormino-deal-max-width);
        margin: 3rem auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

</style>