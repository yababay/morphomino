<script lang="ts">
    import { onMount } from 'svelte';
    import { progress, loadAll } from '../../../controller/loader'
    import Section from '../Section.svelte'

    export let id: string

    onMount(loadAll)
</script>

<Section {id}>
    <svelte:fragment slot="dynamic">
        <div>
            <div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" 
                    role="progressbar" aria-label="Загрузка слов для игры" 
                    aria-valuenow={$progress}
                    aria-valuemin={0} 
                    aria-valuemax={100}
                    style:width={$progress + '%'}
                ></div>
            </div>
        </div>
    </svelte:fragment>
</Section>
