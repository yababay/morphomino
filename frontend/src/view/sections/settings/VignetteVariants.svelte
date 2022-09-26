<script lang="ts">
    /*import CardDesign from "../../components/CardDesign.svelte"
    import ColorPicker from "./ColorPicker.svelte"
    import { durationMin, durationMax, durationStep, moveAmountMin, moveAmountMax, moveAmountStep, ignoreInstructionKey, durationKey, moveAmountKey, vignetteVariantKey } from '../../../settings.json'

    function chooseVignette(e, index) {
        let {target} = e
        while(!(target.classList && Array.from(target.classList).includes('card-holder'))){
            target = target.parentNode  
        }
        for(const div of Array.from(target.parentNode.querySelectorAll('.card-holder'))){
            div['style'].backgroundColor = null
        }
        target.style.backgroundColor = 'silver'
        localStorage.setItem(vignetteVariantKey, index + 1)
    }*/
</script>

<!-- h2>Вариант оформления:</h2>
<div class="design-holder">
        {#each [1,2,3,4,5,6,7,8,9] as vignette, index }
            <div class="card-holder" on:click={e => chooseVignette(e, index)} >
                <CardDesign word="образец" pos="существ." {vignette} />
            </div>
        {/each}
</div>
<ColorPicker / -->
