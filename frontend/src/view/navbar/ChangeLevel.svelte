<script lang="ts">
    import LevelModal from '../sections/settings/LevelModal.svelte'

    export let label: string
    const id = `${Math.random()}`.replace('.', '')
</script>

<LevelModal {id}>
    <svelte:fragment slot="button">
        <button 
            class="btn btn-secondary navbar-button-fixed-width"  
            data-bs-toggle="modal" 
            data-bs-target={`#choose-level-${id}`} 
            href="#choose-level-link"
            >{label}</button>
    </svelte:fragment>
</LevelModal>
