<script lang="ts">
    import CardDesign from "../../components/CardDesign.svelte"
    import Subheader from "../../components/Subheader.svelte"
    import { vignette as vignetteStore } from '../../../controller/settings'
    import { rgb } from '../../../controller/settings'

    $: savedVariant = $vignetteStore

</script>

<Subheader title="Варианты оформления" />
<div class="design-holder">
    {#each [1,2,3,4,5,6,7,8,9] as vignette }
        <div on:click={e => vignetteStore.set(vignette)} class="card-holder" 
            style:opacity={vignette === savedVariant ? 1 : .8} 
            style:background-color={$rgb + ''}
        >
            <CardDesign word="образец" pos="существ." {vignette} />
        </div>
    {/each}
</div>

<style>
    .design-holder {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .card-holder {
        width: 250px;
        height: 155px;
        cursor: pointer;
        padding: 2px;
        margin: 5px;
        border-radius: 8px;
        box-shadow: 2px 2px 3px darkslategrey;
    }
</style>
