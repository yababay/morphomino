<script>
    export let variant
    export let withCartouche = false
    const transform = `translate(${withCartouche ? "-2" : "0"} 0)`
</script>

<svg class="swell-up" viewBox="0 0 50 31">
    <use xlink:href={`./img/vignettes.svg#vignette-${variant}`}
    {transform}
    ></use>
    <slot name="textes" />
</svg>

<style>
    .swell-up {width: 100%; height: 100%}
</style>
