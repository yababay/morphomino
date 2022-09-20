<script>
    import { scores, elapsedTime } from '../../../controller/game'
    export let mode
</script>

<div class="alert alert-success alert-dismissible fade show text-center" role="alert">
    <span class="fw-bold">Поздравляем!</span> Вы правильно выполнили {`${$scores.replace('/', ' заданий из ')}`} за {$elapsedTime} сек.
    <a class="link-success ms-3 fw-bold" href='#statistics'>Посмотреть статистику</a>
    <a class="link-success ms-3 fw-bold" href='#settings'>Изменить настройки</a>
</div>
