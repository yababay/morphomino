<script lang="ts">
    import { levelDescription } from '../../../controller/settings'
    import LevelModal from './LevelModal.svelte'
</script>

<p class="text-end" style="font-size: smaller">
    <strong>Уровень сложности:&nbsp;</strong>
    <span>{$levelDescription}.</span>
    <LevelModal />
</p>
