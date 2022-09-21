<script>
    import Vignette from "./Vignette.svelte"

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
            <text text-anchor="middle"  x="50%" y="16.5" style="font-size:4px">{word}</text>
            {#if withCartouche }
                <text 
                    text-anchor="middle"  x="47.5" y="15.5" style="font-size:4px"
                    transform="rotate(-90 47.5 15.5)"
                >{pos}</text>
                <!-- text
                transform="matrix(0,-0.15701459,0.15701459,0,42.108293,27.167395)"
                style="font-style:normal;font-weight:normal;font-size:16px;line-height:1.25;font-family:sans-serif;text-align:center;white-space:pre;shape-inside:url(#rect8736-3-7);display:inline;fill:#000000;fill-opacity:1;stroke:none"
                x="34.449219"
                y="0">
                <tspan
                    x={getPosShift()}
                    y="24.246094"
                    id="tspan1144">{pos}</tspan>
                </text -->
            {/if}
    
        </svelte:fragment>
</Vignette>
