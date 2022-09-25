<script lang="ts">
    import Section from '../Section.svelte'
    import PartsOfSpeech from './PartsOfSpeech.svelte';

    export let id
</script>

<PartsOfSpeech />
<Section {id}>
    <svelte:fragment slot="dynamic">
        {id}
    </svelte:fragment>
</Section>