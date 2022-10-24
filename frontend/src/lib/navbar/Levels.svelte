<script type="ts">
  import { Level } from '../types'
  const items = Level.getKeysWithLabels().map(({key, label}) => ({level: key.replace('CLASS_', ''), label}))

  export let label = "Выбрать уровень"
</script>
<div class="dropdown">
  <a class="btn btn-primary dropdown-toggle" href="#level-chooser" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    {label}
  </a>

  <ul class="dropdown-menu">
    {#each items.filter(({level})=> level.startsWith('5_')) as item}
      <li><a class="dropdown-item" href={`#game?level=${item.level}`}>{item.label}</a></li>
    {/each}
    <li><hr class="dropdown-divider"></li>
    {#each items.filter(({level})=> level.startsWith('6_')) as item}
      <li><a class="dropdown-item" href={`#game?level=${item.level}`}>{item.label}</a></li>
    {/each}
    <li><hr class="dropdown-divider"></li>
    {#each items.filter(({level})=> level.startsWith('7_')) as item}
      <li><a class="dropdown-item" href={`#game?level=${item.level}`}>{item.label}</a></li>
    {/each}
  </ul>
</div>
