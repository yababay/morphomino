<script>
    import Article from "../../components/Article.svelte"
    export let id
    const afterFetch = txt => txt.replace('<p>', '<span>').replace('</p>', '</span>')
</script>

<div  class="alert alert-primary alert-dismissible fade show text-center" role="alert">
    <Article {id} {afterFetch} />
    <span></span>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Закрыть"></button>
</div>
<div class="progress">
    <div class="progress-bar progress-bar-striped progress-bar-animated w-100" role="progressbar" aria-label="Игра начитается..." aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
</div>
