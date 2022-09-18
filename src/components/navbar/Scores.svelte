<script>
    import { elapsedTime, stage, GameStages } from '../../lib/game'
</script>

<ul class="navbar-nav">
    <li class="nav-item text-light">
        <strong>Время игры:</strong>
        <span>{$elapsedTime}</span>
    </li>
</ul>
<ul class="navbar-nav">
    <li class="nav-item  text-light">
        <strong>Отгадано:</strong>
        <!-- span>{$scores.filter(el => el === true).length}/{$scores.filter(el => typeof el === 'boolean').length}</span -->
    </li>
</ul>
<button class="btn btn-secondary" on:click={() => stage.set(GameStages.BREAK)}>Прервать</button>
