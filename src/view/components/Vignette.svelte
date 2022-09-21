<script>
    export let variant
</script>

<svg class="swell-up" viewBox="0 0 50 31">
    <use xlink:href={`./assets/img/vignettes.svg#vignette-${variant}`}></use>
    <use xlink:href="./assets/img/vignettes.svg#cartouche"></use>
    <slot name="textes" />
    <!-- text
       style="font-style:normal;font-weight:normal;font-size:16px;line-height:1.25;font-family:sans-serif;text-align:center;white-space:pre;shape-inside:url(#rect78732-6-5);display:inline;fill:#000000;fill-opacity:1;stroke:none"
       transform="translate(0 16.5)scale(0.23 0.23)">
       <tspan x={getWordShift()} y="0">{word}</tspan></text>
    <text
       transform="matrix(0,-0.15701459,0.15701459,0,42.108293,27.167395)"
       style="font-style:normal;font-weight:normal;font-size:16px;line-height:1.25;font-family:sans-serif;text-align:center;white-space:pre;shape-inside:url(#rect8736-3-7);display:inline;fill:#000000;fill-opacity:1;stroke:none"
       x="34.449219"
       y="0">
       <tspan
         x={getPosShift()}
         y="24.246094"
         id="tspan1144">{pos}</tspan></text -->
</svg>

<style>
    .swell-up {width: 100%; height: 100%}
</style>