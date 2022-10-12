<script>
    import { hash } from '../../controller/router';
    import Scores from './Scores.svelte'
    import Links from './Links.svelte'
</script>

{#if $hash === "game"}
    <Scores />
{:else}
    <Links />
{/if}
