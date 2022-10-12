<script type="ts">
  import { Level } from '../types'
  const items = Level.getKeysWithLabels().map(({key, label}) => ({level: key.replace('CLASS_', ''), label}))
</script>
<div class="dropdown">
  <a class="btn btn-primary dropdown-toggle" href="#level-chooser" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Выбрать уровень
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

<!-- ul class="navbar-nav navbar-ul-fixed-width dropdown">
    <li class="nav-item">
    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      Выбор уровня:
    </a>
    <ul class="dropdown-menu">

    </ul>
  </li>
</ul -->

<!--script lang="ts">
    import LevelModal from '../sections/settings/LevelModal.svelte'

    export let label: string
    const id = `${Math.random()}`.replace('.', '')
</script>

<LevelModal {id}>
    <svelte:fragment slot="button">
        <button 
            class="btn btn-secondary navbar-button-fixed-width"  
            data-bs-toggle="modal" 
            data-bs-target={`#choose-level-${id}`} 
            href="#choose-level-link"
            >{label}</button>
    </svelte:fragment>
</LevelModal-->
