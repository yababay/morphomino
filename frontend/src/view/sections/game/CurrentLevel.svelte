<script lang="ts">
    import { levelDescription } from '../../../controller/settings'
    import LevelModal from '../settings/LevelModal.svelte'
</script>

<p class="text-end text-bg-dark w-100 fs-smaller">
    <span>Подборка слов:&nbsp;</span>
    <strong>{$levelDescription}</strong>
</p>

<style>
    .fs-smaller {
        font-size: smaller;
    }
</style>