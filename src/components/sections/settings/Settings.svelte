<script>
    import { derived } from 'svelte/store'
    import { timeInSeconds, moviesAmount } from '../../../lib/game';

    import Article from '../Article.svelte'
    export let id
    const timeInMinutes = derived(timeInSeconds, $timeInSeconds => $timeInSeconds / 60)

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
            <label for="game-time" class="form-label"><strong>Время игры:</strong> {$timeInMinutes} мин.</label>
            <input type="range" class="form-range" min="60" max="600" step="60" id="game-time" 
                on:change={e => saveValue(e, timeInSeconds, 'mormino.timeInMinutes')}>
        </div>
        <div class="input-holder">
            <label for="game-moves" class="form-label"><strong>Количество ходов:</strong> {$moviesAmount}</label>
            <input type="range" class="form-range" min="10" max="100" step="10" id="game-moves"
                on:change={e => saveValue(e, moviesAmount, 'mormino.moviesAmount')}>
        </div>
    </div>
</div>

<style>
    .settings-holder {
        max-width: 640px;
        margin: auto;
    }
</style>
