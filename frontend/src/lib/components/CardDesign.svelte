<script>
    import Vignette from "./Vignette.svelte"
    import Cartouche from "./Cartouche.svelte"

    export let vignette, word, pos
    const withCartouche = !!pos
</script>

<Vignette variant={`${vignette < 10 && '0' + vignette || vignette}`} {withCartouche} >
        <svelte:fragment slot="textes">
            <text text-anchor="middle"  x="50%" y="16.5" style="font-size:4px;fill:#FFFFFF">{word}</text>
            {#if withCartouche }
                <Cartouche {pos} />
            {/if}
    
        </svelte:fragment>
</Vignette>
