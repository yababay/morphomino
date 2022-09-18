<script>
    import Article from '../../util/Article.svelte';

    export let id

    /*import { loader } from '../../../controller/dictionary'
    import { processHash } from '../../../controller/router'


    loader.subscribe(val => {
        if(val < 100) return
        setTimeout(() => {
            processHash()
        }, 1000)
    })*/
</script>
<Article {id} />
<!-- div>
    <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated" 
            role="progressbar" aria-label="Animated striped example" 
            aria-valuenow={$loader} 
            aria-valuemin="0" 
            aria-valuemax="100"
            style:width={$loader + '%'}
        ></div>
    </div>
</div -->
