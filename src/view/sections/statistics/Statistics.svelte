<script>
    import { hash } from '../../../controller/router'
    import Article from '../../components/Article.svelte'

    export let id

    hash.subscribe(value => {
        if(value !== id) return
        console.log('TODO: update statistics')
    })

</script>

<Article {id} />