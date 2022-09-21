<script>
    export let word, pos

    function getPosShift(){
        switch(pos.length){
            case 1:
            case 2:
            case 3:
            case 4: return 52
            case 5: return 43
            case 6: return 38
            default: return 35
        }
    }

    function getWordShift(){
        switch(word.length){
            case 1: return 102
            case 2: return 93
            case 3: return 87
            case 4: return 78
            case 5: return 68
            case 6: return 61
            case 7: return 54
            case 8: return 47
            case 9: return 39
            default: return 32
        }
    }
</script>

<svg class="swell-up" viewBox="0 0 50 31">
    <use xlink:href="./assets/img/vignettes.svg#vignette-01"></use>
    <use xlink:href="./assets/img/vignettes.svg#cartouche"></use>
    <text
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
         id="tspan1144">{pos}</tspan></text>
</svg>

<style>
    .swell-up {width: 100%; height: 100%}
</style>