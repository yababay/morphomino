<script lang="ts">
    import { levelDescription } from '../../../controller/settings'
    import LevelModal from '../settings/LevelModal.svelte'
</script>

<p class="text-end text-bg-dark" style="font-size: smaller">
    <strong>Уровень сложности:&nbsp;</strong>
    <span>{$levelDescription}.</span>
    <LevelModal />
</p>
