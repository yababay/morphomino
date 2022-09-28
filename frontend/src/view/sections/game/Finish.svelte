<script type="ts">
    import { GameStages } from '../../../model';
    import { scores } from '../../../controller/flow'
    import { elapsedTime } from '../../../controller/ticker'

    export let mode: GameStages

    function getMessage(): string{
        switch(mode){
            case GameStages.BREAK: return "Игра прервана."
            case GameStages.DEAD_HEAT: return "Игра закончилась вничью."
            case GameStages.HOST_IS_WON: return "В игре победил пригласивший."
            case GameStages.GUEST_IS_WON: return "В игре победил приглашенный"
            case GameStages.FULFILLED: return "Все карточки успешно отгаданы."
            case GameStages.TIMEOUT: return "Время игры закончилось."
            default: return "Игра закончилась по неизвестной причине."
        }
    }
</script>

<div class="alert alert-success alert-dismissible fade show text-center" role="alert">
    <span class="fw-bold">{getMessage()}</span> Вы правильно выполнили {`${$scores.replace('/', ' заданий из ')}`} за {$elapsedTime} сек.
    <br>
    <a class="link-success ms-3 fw-bold" href='#statistics'>Посмотреть статистику</a>
    <a class="link-success ms-3 fw-bold" href='#settings'>Изменить настройки</a>
</div>
