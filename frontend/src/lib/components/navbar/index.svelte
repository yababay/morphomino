<script type="ts">
    import Links from './Links.svelte'
    import Scores from './Scores.svelte'
    import { getIsGame } from '../../store/subscriptions'

    const isGame = getIsGame()

</script>

{#if $isGame }
    <Scores />
{:else}
    <Links />
{/if}
