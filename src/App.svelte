<script>
  import MorphominoSet from './lib/MorphominoSet.svelte'
  import GameFlow from './lib/GameFlow.svelte'
    import Alert from './lib/Alert.svelte';
    import GameProgress from './lib/GameProgress.svelte';
</script>

<div class="game-holder">
  <MorphominoSet />
  <GameFlow />
  <GameProgress />
  <Alert />
</div>

<style>
  .game-holder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
</style>
