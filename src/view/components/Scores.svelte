<script>
    /*
    import { get } from 'svelte/store'
    import { elapsedTime, stage, GameStages, GamerRoles, MoveStatuses, moves, role } from '../../controller/game'

    function getScores(){
        const r = get(role)
        const scores = $moves.filter(
            el => r === 
            GamerRoles.HOST && el === MoveStatuses.HOST_IS_WON
            ||
            GamerRoles.GUEST && el === MoveStatuses.GUEST_IS_WON
        ).length
        return `${scores}/${$moves.length}`
    }*/
</script>
<ul class="navbar-nav">
    <li class="nav-item text-light">
        <strong>Время игры:</strong>
        <span>{0}</span>
    </li>
</ul>
<ul class="navbar-nav">
    <li class="nav-item  text-light">
        <strong>Отгадано:</strong>
        <span>{0/10}</span>
    </li>
</ul>

<!-- ul class="navbar-nav">
    <li class="nav-item text-light">
        <strong>Время игры:</strong>
        <span>{$elapsedTime}</span>
    </li>
</ul>
<ul class="navbar-nav">
    <li class="nav-item  text-light">
        <strong>Отгадано:</strong>
        <span>{getScores()}</span>
    </li>
</ul>
<button class="btn btn-secondary" on:click={() => stage.set(GameStages.BREAK)}>Прервать</button -->
