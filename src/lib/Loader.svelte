<script>
    import { loader } from './dictionary'
</script>
<div class="progress">
    <div class="progress-bar progress-bar-striped progress-bar-animated" 
         role="progressbar" aria-label="Animated striped example" 
         aria-valuenow={$loader} 
         aria-valuemin="0" 
         aria-valuemax="100"
         style:width={$loader + '%'}
    ></div>
</div>
