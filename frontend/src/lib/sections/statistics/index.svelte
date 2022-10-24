<script lang="ts">
    import PartsOfSpeech from './PartsOfSpeech.svelte'
    import Achievements from './Achievements.svelte'
    import loadLevel from '../loader'
</script>

{#await loadLevel() then}
    <Achievements />
    <PartsOfSpeech />
{/await}
