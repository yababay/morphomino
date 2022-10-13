<script lang="ts">
    import { achievements } from '../settings/settings'
    import RemoveAchievement from './RemoveAchievement.svelte'
    import Subheader from '../../components/Subheader.svelte'
    import { getStageDescription } from '../../types';
    import { getGameTime } from '../../sections/game/tickers'

    function formatDate(ts: number): string{
        return new Intl.DateTimeFormat('ru-RU', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(ts))
    }
</script>

<Subheader title="Ваши достижения" />

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
        {#each Array.isArray($achievements) && $achievements || [] as row }
            <tr>
                <td>{formatDate(row.date)}</td>
                <td>{getGameTime(row.elapsed, true)}</td>
                <td>{getGameTime(row.duration, true)}</td>
                <td>{row.scores}</td>
                <td>{row.moves}</td>
                <td>{getStageDescription(row.reason)}</td>
                <td><RemoveAchievement date={row.date}/></td>
            </tr>        
        {/each}
    </tbody>
</table>
