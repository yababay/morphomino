<script type="ts">
    import { isGame } from '../sections/game/game'
    import Scores from './Scores.svelte'
    import Links from './Links.svelte'
</script>

{#if $isGame }
    <Scores />
{:else}
    <Links />
{/if}
