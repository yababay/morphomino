<script lang="ts">
    import { level } from '../../../controller/settings'
    import { progress } from '../../../controller/loader'
    const message = 'Идет загрузка словарей...'
    const src=`./assets/img/${($level + '').replace('CLASS_', 'level-')}.png`
</script>

<div class="level-loader">
    <div class="card">
        <img {src} class="card-img-top" alt="Уровень игры">
        <div class="card-body">
          <p>Идет загрузка словарей...</p>
          <div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated w-100" 
                    role="progressbar" aria-label="Идет загрузка словарей..." 
                    aria-valuenow={75} aria-valuemin={0} aria-valuemax={$level}
                    style:width={$progress + '%'}
                >
                </div>
          </div>
        </div>
    </div>
</div>

<style>
    .level-loader {
        max-width: 80ch;
        margin: auto;
    }
    .level-loader .card {
        width: 100%;
        max-width: 640px;
    }
    .level-loader .progress {
        width: 100%;
    }
</style>

<!-- div>
    <img alt="Заставка уровня" {src} class="mb-3 level-splash-screen" />
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

<style>
    .level-splash-screen {
        width: 640px;
        height: 480px;
    }
</style -->