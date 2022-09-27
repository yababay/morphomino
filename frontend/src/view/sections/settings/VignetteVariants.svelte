<script lang="ts">
    import CardDesign from "../../components/CardDesign.svelte"
    import { vignetteVariantKey } from '../../../../settings.json'

    function getVariant(): number{
        let variant = localStorage.getItem(vignetteVariantKey)
        if(!variant) return Math.floor(Math.random() * 9)
        return parseInt(variant) - 1
    }

    let savedVariant = getVariant()

    function chooseVignette(index: number) {
        savedVariant = index
        localStorage.setItem(vignetteVariantKey, `${index + 1}`)
    }
</script>

<h2>Варианты оформления:</h2>
<div class="design-holder">
        {#each [1,2,3,4,5,6,7,8,9] as vignette, index }
            <div on:click={e => chooseVignette(index)} class="card-holder" style:border={index === savedVariant ? '1px dotted grey' : ''} >
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
/*
    .activу-vignette {
        border: 1px dotted grey;
        margin: 2px;
        background-color:#ddd;
    }

    .inactive-vignette {
        border: 0;
        margin: 3px;
    }*/
</style>
