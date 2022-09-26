<script lang="ts">
    import Article from '../components/Article.svelte'

    export let id: string
    export let afterFetch = (h: string): string => h
</script>

<Article {id} {afterFetch} />
<slot name="dynamic" />
