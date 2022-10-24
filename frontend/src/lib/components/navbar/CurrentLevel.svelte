<script lang="ts">
    import { levelClass, levelNumber } from '../../store'
</script>

<ul class="navbar-nav navbar-ul-long-fixed-width">
    <li class="nav-item text-light">
        <span>Класс: </span>
        <strong>{$levelClass}</strong>
        <span>, уровень: </span>
        <strong>{$levelNumber}</strong>
    </li>
</ul>
