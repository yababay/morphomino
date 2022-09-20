<script>
    import { onMount } from 'svelte'
    import { progress } from '../../../controller/router'
    import loadAllWords from '../../../controller/loader'
    import Article from '../../components/Article.svelte'

    export let id

    onMount(loadAllWords)

</script>
<Article {id} />
<div>
    <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated" 
            role="progressbar" aria-label="Animated striped example" 
            aria-valuenow={$progress} 
            aria-valuemin={0} 
            aria-valuemax={100}
            style:width={$progress + '%'}
        ></div>
    </div>
</div>
