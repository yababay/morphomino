<script>
    import { hash } from '../lib/router';
    import Scores from './Scores.svelte'
    import Links from './Links.svelte'
</script>

{#if $hash === "game"}
    <Scores />
{:else}
    <Links />
{/if}
