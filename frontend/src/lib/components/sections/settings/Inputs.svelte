<script>
    import { derived } from 'svelte/store'
    import { duration, movesAmount, ignoreInstruction } from '.'
    import { 
        durationMin, durationMax, durationStep,
        moveAmountMin, moveAmountMax, moveAmountStep,
    } from '../../../../../settings.json'
    
    import Levels from './Levels.svelte'
    
    const durationInMinutes = derived(duration, $duration => Math.floor($duration / 60))
</script>

<div class="card settings-holder">
    <div class="card-body">
        <div class="input-holder mb-3">
            <p class="form-label"><strong>Выбор уровня:</strong></p>
            <Levels />
        </div>
        <div class="input-holder">
            <label for="game-duration" class="form-label"><strong>Время игры:</strong> {$durationInMinutes} мин.</label>
            <input 
                id="game-duration" 
                type="range" class="form-range" 
                min={durationMin} max={durationMax} step={durationStep} 
                on:change={e => e.target instanceof HTMLInputElement && duration.set(e.target.value)}
                value={$duration}
            >
        </div>
        <div class="input-holder">
            <label for="game-moves" class="form-label"><strong>Количество ходов:</strong> {$movesAmount}</label>
            <input 
                id="game-moves"
                type="range" 
                class="form-range" 
                min={moveAmountMin} max={moveAmountMax} step={moveAmountStep} 
                on:change={e => movesAmount.set(e.target instanceof HTMLInputElement && e.target.value)}
                value={$movesAmount}
            >
        </div>
        <div class="form-check form-switch mt-3">
            <input 
                id="ignore-instruction" 
                class="form-check-input" 
                type="checkbox" role="switch" aria-checked={!!$ignoreInstruction}
                on:change={e => e.target instanceof HTMLInputElement && ignoreInstruction.set(e.target.checked)}
            >
            <label class="form-check-label" for="ignore-instruction">Игнорировать начальную инструкцию</label>
        </div>
          
    </div>
</div>
