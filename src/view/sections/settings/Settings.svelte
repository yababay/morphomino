<script>
    import Article from '../../util/Article.svelte'

    export let id

    /*import { onMount } from 'svelte'
    import { derived } from 'svelte/store'
    import { durationInSeconds, moviesAmount } from '../../../controller/game'
    import { fromStorage, saveValue } from '../../../controller/util'
    import { durationMin, durationMax, durationStep, 
        moveAmountMin, moveAmountMax, moveAmountStep, ignoreInstruction,
        moveAmountKey, durationKey, ignoreInstructionKey } from '../../../settings.json'
    import Article from '../../util/Article.svelte'

    export let id
    
    let durationInput, moveAmountInput, ignoreInstructionInput

    onMount(() => {
        let dur = fromStorage(durationKey, durationMin)
        let mov = fromStorage(moveAmountKey, moveAmountMin)
        let ign = fromStorage(ignoreInstructionKey, ignoreInstruction)
        durationInput.value = dur
        moveAmountInput.value = mov
        ignoreInstructionInput.checked = ign
        durationInSeconds.set(dur)
        moviesAmount.set(mov)
    })

    const durationInMinutes = derived(durationInSeconds, $durationInSeconds => $durationInSeconds / 60)
*/
</script>
<Article {id} />
<!-- 
<div class="card mt-5 settings-holder">
    <div class="card-body">
        <div class="input-holder">
            <label for="game-duration" class="form-label"><strong>Время игры:</strong> {$durationInMinutes} мин.</label>
            <input 
                id="game-duration" 
                type="range" class="form-range" 
                min={durationMin} max={durationMax} step={durationStep} 
                bind:this={durationInput}
                on:change={e => saveValue(e, durationKey, durationInSeconds)}
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
                on:change={e => saveValue(e, moveAmountKey, moviesAmount)}
            >
        </div>
        <div class="form-check form-switch mt-3">
            <input 
                id="ignore-instruction" 
                class="form-check-input" 
                type="checkbox" role="switch" 
                bind:this={ignoreInstructionInput}
                on:change={e => saveValue(e, ignoreInstructionKey)}
            >
            <label class="form-check-label" for="ignore-instruction">Игнорировать начальную инструкцию</label>
        </div>
          
    </div>
</div>

<style>
    .settings-holder {
        max-width: 640px;
        margin: auto;
    }
</style>
-->