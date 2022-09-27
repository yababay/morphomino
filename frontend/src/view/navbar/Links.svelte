<script lang="ts">
  import Link from './Link.svelte'
</script>

<div class="d-flex justify-content-between align-items-center right-items-holder">
  <Link label="Правила" href="#intro" />
  <Link label="Настройки" href="#settings" />
  <Link label="Статистика" href="#statistics" />
  <a class="btn btn-primary" href="#game">Начать игру</a>
</div>

<style>
  .right-items-holder {
    width: 480px;
  }
</style>
