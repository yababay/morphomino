<script lang="ts">
  import Link from './Link.svelte'
  import ChangeLevel from './ChangeLevel.svelte'
  let audioDeal

  function palySound(){
      audioDeal.play();
  }
</script>



<Link label="Правила" href="#intro" />
<Link label="Настройки" href="#settings" />
<Link label="Статистика" href="#statistics" />
<ChangeLevel label="Выбрать уровень" />
<audio bind:this={audioDeal}>
  <source src="./assets/audio/deal.mp3" type="audio/mpeg">
</audio>
<a class="btn btn-primary navbar-button-fixed-width" href="#game" on:click={palySound}>Начать игру</a>

