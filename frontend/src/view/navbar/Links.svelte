<script lang="ts">
  import { onMount } from 'svelte'
  import Link from './Link.svelte'
  import ChangeLevel from './ChangeLevel.svelte'
  let audioDeal
</script>

<Link label="Правила" href="#intro" />
<Link label="Настройки" href="#settings" />
<Link label="Статистика" href="#statistics" />
<ChangeLevel label="Выбрать уровень" />
<a class="btn btn-primary navbar-button-fixed-width" href="#game">Начать игру</a>

