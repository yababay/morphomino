<script>
    import { onMount } from 'svelte'
    import { toStorage } from '../../../controller/util'
    import { durationInSeconds, durationInMinutes, moviesAmount, ignoreInstruction } from '../../../controller/settings'
    import { durationMin, durationMax, durationStep, moveAmountMin, moveAmountMax, moveAmountStep, ignoreInstructionKey, durationKey, moveAmountKey } from '../../../settings.json'
    import Article from '../../components/Article.svelte'
    import MorminoCard from '../../components/MorminoCard.svelte'

    export let id
    let durationInput, moveAmountInput, ignoreInstructionInput

    onMount(() => {
        durationInput.value = $durationInSeconds
        moveAmountInput.value = $moviesAmount
        ignoreInstructionInput.checked = $ignoreInstruction
    })
</script>

<Article {id} />
<div class="card mt-5 settings-holder">
    <div class="card-body">
        <div class="input-holder">
            <label for="game-duration" class="form-label"><strong>Время игры:</strong> {$durationInMinutes} мин.</label>
            <input 
                id="game-duration" 
                type="range" class="form-range" 
                min={durationMin} max={durationMax} step={durationStep} 
                bind:this={durationInput}
                on:change={e => toStorage(e, durationKey, durationInSeconds)}
            >
        </div>
        <div class="input-holder">
            <label for="game-moves" class="form-label"><strong>Количество ходов:</strong> {$moviesAmount}</label>
            <input 
                id="game-moves"
                type="range" 
                class="form-range" 
                min={moveAmountMin} max={moveAmountMax} step={moveAmountStep} 
                bind:this={moveAmountInput}
                on:change={e => toStorage(e, moveAmountKey, moviesAmount)}
            >
        </div>
        <div class="form-check form-switch mt-3">
            <input 
                id="ignore-instruction" 
                class="form-check-input" 
                type="checkbox" role="switch" aria-checked={ignoreInstructionInput && ignoreInstructionInput.checked}
                bind:this={ignoreInstructionInput}
                on:change={e => toStorage(e, ignoreInstructionKey)}
            >
            <label class="form-check-label" for="ignore-instruction">Игнорировать начальную инструкцию</label>
        </div>
          
    </div>
</div>
<MorminoCard word="образец" vignette={5} pos="союз"/>
<!-- h2>Вариант оформления:</h2>
<div class="design-holder">
        {#each [1,2,3,4,5,6,7,8,9] as vignette }
            <div class="card-holder">
                <CardDesign word="образец" pos="существ." {vignette} />
            </div>
        {/each}
</div>
<MorminoWord word="образец" vignette={5} />
-->

<style>
    .settings-holder {
        max-width: 640px;
        margin: auto;
    }

    .design-holder {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .card-holder {
        width: 250px;
        height: 155px;
    }
</style>
