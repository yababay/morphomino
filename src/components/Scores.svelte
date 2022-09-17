<script>
    import { gameTime, gameOver, scores, gameTimeCounter } from '../lib/store'

    function stopGame(){
        gameOver.set(true)
        clearInterval(gameTimeCounter)
        alert('Game over')
        window.location.hash = '#statistics'
    }
</script>

<ul class="navbar-nav">
    <li class="nav-item text-light">
        <strong>Время игры:</strong>
        <span>{$gameTime}</span>
    </li>
</ul>
<ul class="navbar-nav">
    <li class="nav-item  text-light">
        <strong>Отгадано:</strong>
        <span>{$scores.filter(el => el === true).length}/{$scores.filter(el => typeof el === 'boolean').length}</span>
    </li>
</ul>
<button class="btn btn-secondary" on:click={stopGame}>Прервать</button>

