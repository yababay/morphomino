<script>
    import CardDesign from "./CardDesign.svelte"

    export let word, vignette
    export let pos = ""
</script>

<CardDesign {word} {vignette} {pos} />
