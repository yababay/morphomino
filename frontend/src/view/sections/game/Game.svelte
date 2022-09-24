<script lang="ts">
    import Section from '../Section.svelte'
    import Level from '../../components/Level.svelte'

    export let id
</script>

<Section {id}>
    <svelte:fragment slot="dynamic">
        <div class="level-holder">
            <Level />
        </div>
    </svelte:fragment>
</Section>

<style>
    .level-holder {
        position: relative;
        top: 3rem;
        right: 3rem;
    }
</style>