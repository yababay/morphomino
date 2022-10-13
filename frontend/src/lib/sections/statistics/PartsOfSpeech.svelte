<script>
    import PartOfSpeech from '../../types/pos'
    import Subheader from '../../components/Subheader.svelte'

    function getRows() {
        return PartOfSpeech.getKeyNames()
            .map(key => new PartOfSpeech(key))
            .map(({value, genetive}) => [genetive, PartOfSpeech.getStatistics(value)])
            .filter(([_, v]) => v > 0)
            .sort((a, b) => b[1] > a[1] ? 1 : -1)
    }

</script>

<Subheader title="Задействовано частей речи:" />
    <table class="table table-primary table-striped pos-statistics">
        <thead>
            <tr><th>Часть речи</th><th>Загружено</th></tr>
        </thead>
        <tbody>
            {#each getRows() as row}
                <tr><td>{row[0]}</td><td>{row[1]}</td></tr>
            {/each}
        </tbody>
    </table>
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
