<script lang="ts">
    import { achievements, removeAchievement } from '../../../controller/settings'
    import RemoveAchievement from './RemoveAchievement.svelte'
    import { getStageDescription } from '../../../model';


    function formatDate(ts: number): string{
        return new Intl.DateTimeFormat('ru-RU', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(ts))
    }
</script>

<h2>Ваши достижения</h2>
<table class="table table-success table-striped pos-statistics">
    <thead>
        <tr>
            <th>Дата</th>
            <th>Затрачено</th>
            <th>Всего времени</th>
            <th>Верных ответов</th>
            <th>Всего карточек</th>
            <th>Разультат игры</th>
            <th>&nbsp;</th>
        </tr>
    </thead>
    <tbody>
        {#each $achievements as row }
            <tr>
                <td>{formatDate(row.date)}</td>
                <td>{row.elapsed} сек.</td>
                <td>{row.duration} сек.</td>
                <td>{row.scores}</td>
                <td>{row.moves}</td>
                <td>{getStageDescription(row.reason)}</td>
                <td><RemoveAchievement date={row.date}/></td>
            </tr>        
        {/each}
    </tbody>
</table>
