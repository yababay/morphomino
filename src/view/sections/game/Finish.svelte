<script>
    import { startGame } from '../../../controller/game'
    import { hash } from '../../../controller/router'
    import { gameSectionId } from '../../../settings.json'

    export let mode

    function resetGame(){
        if($hash === gameSectionId) startGame()
        else window.location.hash = `#${gameSectionId}`
    }
</script>

<div class={`alert alert-${mode} alert-dismissible fade show text-center`} role="alert">
    <strong>Поздравляем!</strong> Вы правильно выполнили 8 заданий из {10} за {100} сек.
    <button type="button" class="btn btn-success ms-3" 
        data-bs-dismiss="alert" aria-label="Перезапустить"
        on:click={resetGame}>Начать новую игру</button>
    <a type="button" class="btn btn-success ms-3" 
        data-bs-dismiss="alert" aria-label="Статистика"
        href='#statistics'>Посмотреть статистику</a>
</div>
