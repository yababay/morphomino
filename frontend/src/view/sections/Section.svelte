<script lang="ts">
    import Article from '../components/Article.svelte'
    export let id: string
</script>

<Article {id} />
<slot name="dynamic">
    <p>Что-нибудь полезное</p>
</slot>
