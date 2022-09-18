<script>
    import { onMount } from 'svelte'
    import { derived } from 'svelte/store'
    import { durationInSeconds, moviesAmount } from '../../../lib/game'
    import { durationMin, durationMax, durationStep, 
        moveAmountMin, moveAmountMax, moveAmountStep, ignoreInstruction,
        moveAmountKey, durationKey, ignoreInstructionKey } from '../../../settings.json'
    import Article from '../Article.svelte'

    export let id
    
    let durationInput, moveAmountInput, ignoreInstructionInput

    function fromStorage(key, min){
        let val = localStorage.getItem(key) || min
        if(['true', 'false'].includes(val)) val = val === 'true'
        else if(!isNaN(val)) val = parseInt(val)
        return val
    }

    onMount(() => {
        let dur = fromStorage(durationKey, durationMin)
        let mov = fromStorage(moveAmountKey, moveAmountMin)
        let ign = fromStorage(ignoreInstructionKey, false)
        durationInput.value = dur
        moveAmountInput.value = mov
        ignoreInstructionInput.checked = ign
        durationInSeconds.set(dur)
        moviesAmount.set(mov)
    })

    const durationInMinutes = derived(durationInSeconds, $durationInSeconds => $durationInSeconds / 60)
    
    function toggleInstructionIgnoration(e){
        localStorage.setItem(ignoreInstructionKey, e.target.checked)
    }

    function saveValue(e, writable, key){
        let {value} = e.target
        value = parseInt(value)
        writable.set(value)
        localStorage.setItem(key, value)
    }

</script>

<Article {id} />
<div class="card mt-5 settings-holder">
    <div class="card-body">
        <div class="input-holder">
            <label for="game-duration" class="form-label"><strong>Время игры:</strong> {$durationInMinutes} мин.</label>
            <input 
                id="game-duration" 
                type="range" class="form-range" 
                bind:this={durationInput}
                min={durationMin} max={durationMax} step={durationStep} 
                on:change={e => saveValue(e, durationInSeconds, durationKey)}
            >
        </div>
        <div class="input-holder">
            <label for="game-moves" class="form-label"><strong>Количество ходов:</strong> {$moviesAmount}</label>
            <input 
                id="game-moves"
                type="range" 
                class="form-range" 
                bind:this={moveAmountInput}
                min={moveAmountMin} max={moveAmountMax} step={moveAmountStep} 
                on:change={e => saveValue(e, moviesAmount, moveAmountKey)}
            >
        </div>
        <div class="form-check form-switch mt-3">
            <input 
                class="form-check-input" 
                type="checkbox" role="switch" id="ignore-instruction" 
                on:change={toggleInstructionIgnoration}
                bind:this={ignoreInstructionInput}
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
