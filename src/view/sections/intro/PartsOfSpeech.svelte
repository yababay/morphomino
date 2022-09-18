<script>
    import { loader, getStatisticsByPos } from '../../../controller/dictionary'
    import { getPosDescription, getKeyNames } from '../../../model/pos'

    function getRows() {
        return getKeyNames().filter(key => key !== 'UNDEFINED')
            .map(key => getPosDescription(key))
            .map(({pos, genetive}) => [genetive, getStatisticsByPos(pos)])
            .sort((a, b) => b[1] > a[1] ? 1 : -1)
    }
</script>

{#if $loader === 100}
    <table class="table table-success table-striped pos-statistics">
        <thead>
            <tr><th>Часть речи</th><th>Загружено</th></tr>
        </thead>
        <tbody>
            {#each getRows() as row}
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
