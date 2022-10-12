<script type="ts">
    import { GameStages, getStageDescription } from '../../../model';
    import { scoresVerbose } from '../../../controller/flow'
    import { elapsed, stage, getGameTime } from '../../../controller/tickers'

    let mode: GameStages
</script>

<div class="alert alert-success alert-dismissible fade show text-center" role="alert">
    <span class="fw-bold">{getStageDescription($stage)}</span> 
    Вы правильно выполнили {$scoresVerbose} за {getGameTime($elapsed)}.
    <br>
    <a class="link-success ms-3 fw-bold" href='#statistics'>Посмотреть статистику</a>
    <a class="link-success ms-3 fw-bold" href='#settings'>Изменить настройки</a>
</div>
