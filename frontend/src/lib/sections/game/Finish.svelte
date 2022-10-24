<script type="ts">
    import { getStageDescription } from '../../types';
    import { elapsed, scoresVerbose, stage } from '../../store'
    import { getGameTime } from '../../util'
</script>

<div class="alert alert-success alert-dismissible fade show text-center" role="alert">
    <span class="fw-bold">{getStageDescription($stage)}</span> 
    Вы правильно выполнили {$scoresVerbose} за {getGameTime($elapsed)}.
    <br>
    <a class="link-success ms-3 fw-bold" href='#intro'>Прочитать инструкцию</a>
    <a class="link-success ms-3 fw-bold" href='#statistics'>Посмотреть статистику</a>
    <a class="link-success ms-3 fw-bold" href='#settings'>Изменить настройки</a>
</div>
