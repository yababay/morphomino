<script>
    import MorminoCard from '../../components/MorminoCard.svelte'
    import Progress from './Progress.svelte'
    import { flow, setRandomItems } from '../../../controller/flow'

    let audioDeal
</script>

<!-- audio bind:this={audioDeal}>
    <source src="./assets/audio/deal.mp3" type="audio/mpeg">
</audio -->

<div class="mormino-flow">
    <div class="flow-control">
        <Progress />
    </div>
    <div class="mormino-card">
        <MorminoCard word={$flow.at(-1).word} pos={$flow.at(-1).nextShortName} vignette={1} />
    </div>
    <div class="flow-control" on:click={e => {/*audioDeal.play();*/ setRandomItems()}} style="cursor: pointer; filter: drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7));">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="beige" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
        </svg>
    </div>
</div>

<style>
    :root{
        --mormino-flow-max-width: 1000px;
        --mormino-flow-card-width: calc(var(--mormino-flow-max-width) / 3 - 3px);
        --mormino-flow-card-height: calc(var(--mormino-flow-card-width) / 1.618)
    }

    .flow-control {
        width: calc((var(--mormino-flow-max-width) - var(--mormino-flow-card-width)) / 2 - 10px);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .mormino-card {
        width: var(--mormino-flow-card-width);
        height: var(--mormino-flow-card-height);
        background-color: beige;
    }

    .mormino-flow {
        width: var(--mormino-flow-max-width);
        margin: 3rem auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>