<script lang="ts">
  import Link from "./Link.svelte";
  import Levels from "./Levels.svelte";
</script>

<div class="ms-3">
  <Link label="Правила" href="#intro" />
</div>
<div class="ms-3">
  <Link label="Настройки" href="#settings" />
</div>
<div class="ms-3">
  <Link label="Статистика" href="#statistics" />
</div>
<div class="ms-3">
  <Levels />
</div>
<div class="ms-3">
  <a class="btn btn-primary" href="#game">Начать игру</a>
</div>
