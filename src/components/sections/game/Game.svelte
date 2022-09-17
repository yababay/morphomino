<script>
    //import { onMount } from 'svelte'
    import Article from '../Article.svelte'
    export let id
    let instruction

    const afterFetch = txt => txt.replace('<p>', '<span>').replace('</p>', '</span>')

    /*onMount(() => {
        const p = instruction.querySelector('p')
        p.style.display = 'none'
    })*/
</script>

<div  class="alert alert-primary alert-dismissible fade show text-center" role="alert" bind:this={instruction}>
    <Article {id} {afterFetch} />
    <span></span>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Закрыть"></button>
</div>
