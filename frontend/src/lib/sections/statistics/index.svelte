<script lang="ts">
    import PartsOfSpeech from './PartsOfSpeech.svelte'
    import Achievements from './Achievements.svelte'
    import { MorminoItem } from '../../types'
</script>

<Achievements />

{#if MorminoItem.isLoaded()}
    <PartsOfSpeech />
{/if}
