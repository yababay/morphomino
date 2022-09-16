<script>
    import { hashHolder } from './store';
    import Scores from './Scores.svelte'
    import Links from './Links.svelte'
</script>

{#if $hashHolder === "game"}
    <Scores />
{:else}
    <Links />
{/if}
