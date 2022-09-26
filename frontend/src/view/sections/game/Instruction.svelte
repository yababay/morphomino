<script type="ts">
    import Section from '../Section.svelte'

    export let id: string

    function afterFetch(txt: string): string {
        return txt.replace('<p>', '<span>').replace('</p>', '</span>')
    }
</script>

<div class="instruction">
    <div  class="alert alert-primary alert-dismissible fade show text-center" role="alert">
        <Section {id} {afterFetch} />
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Закрыть"></button>
    </div>
    <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated w-100" role="progressbar" aria-label="Игра начитается..." 
            aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
        </div>
    </div>
</div>

<style>
    .instruction {
        max-width: 80ch;
    }
    .instruction .progress {
        width: 100%;
    }
</style>