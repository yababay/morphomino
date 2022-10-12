<script lang="ts">
    import CardDesign from "../../components/CardDesign.svelte"
    import { vignetteVariant } from './settings'
    import { backgroundColor } from './settings'

    $: savedVariant = $vignetteVariant

</script>

<div class="design-holder">
    {#each [1,2,3,4,5,6,7,8,9] as vignette }
        <div on:click={e => vignetteVariant.set(vignette)} class="card-holder" 
            style:opacity={vignette === savedVariant ? 1 : .4} 
            style:background-color={`${$backgroundColor}`}
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
