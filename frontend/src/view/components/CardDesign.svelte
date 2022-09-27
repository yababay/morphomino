<script>
    import Vignette from "./Vignette.svelte"
    import { rgb } from '../../controller/settings'

    export let vignette, word, pos
    const withCartouche = !!pos
</script>

<Vignette variant={`${vignette < 10 && '0' + vignette || vignette}`} >
        <svelte:fragment slot="cartouche">
            {#if withCartouche }
                <use xlink:href="./assets/img/vignettes.svg#cartouche"></use>
            {/if}
        </svelte:fragment>
        <svelte:fragment slot="textes">
            <text text-anchor="middle"  x="50%" y="16.5" style={`font-size:4px;fill:${$rgb}`}>{word}</text>
            {#if withCartouche }
                <text 
                    text-anchor="middle"  x="47.5" y="15.5" style={`font-size:4px;fill:${$rgb}`}
                    transform="rotate(-90 47.5 15.5)">{pos}</text>
            {/if}
    
        </svelte:fragment>
</Vignette>
