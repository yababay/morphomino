<script>
    import { derived } from 'svelte/store'
    import { duration, movesAmount, ignoreInstruction } from '../../../controller/settings'
    import { durationMin, durationMax, durationStep, moveAmountMin, moveAmountMax, moveAmountStep, ignoreInstructionKey, durationKey, moveAmountKey, vignetteVariantKey } from '../../../../settings.json'

    const durationInMinutes = derived(duration, $duration => Math.floor($duration / 60))
</script>

<h2 class="fs-3">Основные настройки</h2>
<div class="card mt-5 settings-holder">
    <div class="card-body">
        <div class="input-holder">
            <label for="game-duration" class="form-label"><strong>Время игры:</strong> {$durationInMinutes} мин.</label>
            <input 
                id="game-duration" 
                type="range" class="form-range" 
                min={durationMin} max={durationMax} step={durationStep} 
                on:change={e => duration.set(e.target.value)}
            >
        </div>
        <div class="input-holder">
            <label for="game-moves" class="form-label"><strong>Количество ходов:</strong> {$movesAmount}</label>
            <input 
                id="game-moves"
                type="range" 
                class="form-range" 
                min={moveAmountMin} max={moveAmountMax} step={moveAmountStep} 
                on:change={e => movesAmount.set(e.target.value)}
            >
        </div>
        <div class="form-check form-switch mt-3">
            <input 
                id="ignore-instruction" 
                class="form-check-input" 
                type="checkbox" role="switch" aria-checked={!!$ignoreInstruction}
                on:change={e => ignoreInstruction.set(e.target.checked)}
            >
            <label class="form-check-label" for="ignore-instruction">Игнорировать начальную инструкцию</label>
        </div>
          
    </div>
</div>
