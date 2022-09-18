<script>
    import { GameStages, stage, startGame, getElapsedTimeWithUnits, moviesAmount, getScores } from '../../../lib/game'
    import Article from '../Article.svelte'

    export let id

    const afterFetch = txt => txt.replace('<p>', '<span>').replace('</p>', '</span>')

</script>

{#if $stage === GameStages.INSTRUCTION }
    <div  class="alert alert-primary alert-dismissible fade show text-center" role="alert">
        <Article {id} {afterFetch} />
        <span></span>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Закрыть"></button>
    </div>
    <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated w-100" role="progressbar" aria-label="Игра начитается..." aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
{:else if $stage === GameStages.END }
    <div class="alert alert-success alert-dismissible fade show text-center" role="alert">
        <strong>Поздравляем!</strong> Вы правильно выполнили 8 заданий из {$moviesAmount} за {getElapsedTimeWithUnits()}.
        <button type="button" class="btn btn-success ms-3" 
            data-bs-dismiss="alert" aria-label="Перезапустить"
            on:click={startGame}>Начать новую игру</button>
        <a type="button" class="btn btn-success ms-3" 
            data-bs-dismiss="alert" aria-label="Статистика"
            href='#statistics'>Посмотреть статистику</a>
    </div>
{/if}
