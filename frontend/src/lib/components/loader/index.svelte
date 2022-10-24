<script lang="ts">
    import { progress, level } from '../../store/'
    $: width = `${$progress}%`
</script>

<div class="card" style="max-width: 640px; margin: auto; height: var(--min-main-height)">
    <div class="card-body">
      <img src={`./img/level-${$level}.png`} class="card-img-top" alt="Уровень игры" style="width: 100%">
      <p class="mt-1 mb-1">Идет загрузка словарей...</p>
      <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated" 
            role="progressbar" aria-label="Идет загрузка словарей..." 
            aria-valuenow={$progress} aria-valuemin={0} aria-valuemax={100}
            style:width={width}>
        </div>
      </div>
    </div>
</div>
