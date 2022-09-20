<script>
    import { breakGame, scores, elapsedTime } from '../../controller/game'
</script>

<ul class="navbar-nav">
    <li class="nav-item text-light">
        <strong>Время игры:</strong>
        <span>{elapsedTime}</span>
    </li>
</ul>
<ul class="navbar-nav">
    <li class="nav-item  text-light">
        <strong>Отгадано:</strong>
        <span>{scores}</span>
    </li>
</ul>
<button class="btn btn-secondary" on:click={breakGame}>Прервать</button>
