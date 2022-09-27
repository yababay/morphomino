<script type="ts">
    import type { Writable } from 'svelte/store';
    import { toStorage } from '../../../controller/util'
    export let label: string, key: string, writable: Writable<number>
</script>

<div class="col-md-4 col-lg-4 p-5">
    <p class="text-center">{label}</p>
    <input type="range" class="form-range" min={0} max={255} step={1}
        on:change={e => toStorage(e, key, writable)} 
        value={$writable}>
</div>
