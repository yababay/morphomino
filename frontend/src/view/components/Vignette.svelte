<script>
    export let variant
</script>

<svg class="swell-up" viewBox="0 0 50 31">
    <use xlink:href={`./assets/img/vignettes.svg#vignette-${variant}`}
    transform="translate(-1.2 0)"
    ></use>
    <slot name="cartouche" />
    <slot name="textes" />
</svg>

<style>
    .swell-up {width: 100%; height: 100%}
</style>