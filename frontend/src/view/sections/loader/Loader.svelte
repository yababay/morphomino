<script lang="ts">
    import { progress } from '../../../controller/loader'
    const message = 'Идет загрузка словарей...'
</script>

<div>
    <p>{message}</p>
    <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated" 
            role="progressbar" aria-label={message} 
            aria-valuenow={$progress}
            aria-valuemin={0} 
            aria-valuemax={100}
            style:width={$progress + '%'}
        ></div>
    </div>
</div>
