<script>
    import { loader } from '../../lib/dictionary'
    import { processHash } from '../../lib/router'
    loader.subscribe(val => {
        if(val < 100) return
        setTimeout(() => {
            processHash()
        }, 1000)
    })
</script>
<div class="wrapper">
<div class="progress">
    <div class="progress-bar progress-bar-striped progress-bar-animated" 
         role="progressbar" aria-label="Animated striped example" 
         aria-valuenow={$loader} 
         aria-valuemin="0" 
         aria-valuemax="100"
         style:width={$loader + '%'}
    ></div>
</div>
</div>

<style>
    .wrapper {
        height: var(--main-min-height); 
        width: 100%; 
        display: flex; 
        justify-content: space-around; 
        flex-direction: column;
    }
</style>
