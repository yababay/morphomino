<script lang="ts">
  import Link from './Link.svelte'

  let audioDeal

  function palySound(){
      audioDeal.play();
  }
</script>

<audio bind:this={audioDeal}>
    <source src="./assets/audio/deal.mp3" type="audio/mpeg">
</audio>

<div class="d-flex justify-content-between align-items-center right-items-holder">
  <Link label="Правила" href="#intro" />
  <Link label="Настройки" href="#settings" />
  <Link label="Статистика" href="#statistics" />
  <a class="btn btn-primary" href="#game" on:click={palySound}>Начать игру</a>
</div>

<style>
  .right-items-holder {
    width: 480px;
  }
</style>
