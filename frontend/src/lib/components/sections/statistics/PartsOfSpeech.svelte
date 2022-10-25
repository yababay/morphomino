<script>
    import PartOfSpeech from '../../../types/pos'
    import Subheader from '../../Subheader.svelte'
    import { dictionary } from '../../../store';

    function reducePos(acc, curr) {
        const pos = new PartOfSpeech(curr)
        const {value, genetive} = pos
        const item = [genetive, PartOfSpeech.getStatistics(value, $dictionary)]
        return [...acc, item]
    }

    $: posRows = $dictionary.reduce(reducePos, [])
        .filter(([_, v]) => v > 0)
        .sort((a, b) => b[1] > a[1] ? 1 : -1)

</script>

{#if $posRows.length > 0}
    <Subheader title="Задействовано частей речи:" />
    <table class="table table-primary table-striped pos-statistics">
        <thead>
            <tr><th>Часть речи</th><th>Загружено</th></tr>
        </thead>
        <tbody>
            {#each $posRows as row}
                <tr><td>{row[0]}</td><td>{row[1]}</td></tr>
            {/each}
        </tbody>
    </table>
{/if}

<style>
    .pos-statistics {
        max-width: 50ch;
        margin: 0 auto;
    }
    .pos-statistics th, .pos-statistics tr :nth-child(2) {
        text-align: center;
    }
    .pos-statistics tr :nth-child(2) {
        width: 30%;
    }
</style>
