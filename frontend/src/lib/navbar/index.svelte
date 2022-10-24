<script type="ts">
    import type { Writable } from 'svelte/store';
    import Scores from './Scores.svelte'
    import Links from './Links.svelte'
    export let hash: Writable<string>
</script>

{#if $hash.startsWith('#game')}
    <Scores />
{:else}
    <Links />
{/if}
