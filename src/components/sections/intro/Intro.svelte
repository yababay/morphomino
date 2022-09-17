<script>
    import PartsOfSpeech from './PartsOfSpeech.svelte'
    import Article from '../Article.svelte'

    export let id

</script>

<Article {id} />
<PartsOfSpeech />