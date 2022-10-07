<script lang="ts">
    import CardDesign from "../../components/CardDesign.svelte"
    import Subheader from "../../components/Subheader.svelte"
    import { vignette as vignetteStore } from '../../../controller/settings'

    $: savedVariant = $vignetteStore

</script>

<Subheader title="Варианты оформления" />
<div class="design-holder">
    {#each [1,2,3,4,5,6,7,8,9] as vignette }
        <div on:click={e => vignetteStore.set(vignette)} class="card-holder" style:border={vignette === savedVariant ? '1px dotted grey' : ''} >
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
    }
</style>
