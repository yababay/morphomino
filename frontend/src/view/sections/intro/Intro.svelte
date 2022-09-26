<script lang="ts">
    import Section from '../Section.svelte'

    export let id: string
</script>

<Section {id}>
    <svelte:fragment slot="dynamic">
        {id}
    </svelte:fragment>
</Section>