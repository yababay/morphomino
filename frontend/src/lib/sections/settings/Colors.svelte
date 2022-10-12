<script lang="ts">
    import { backgroundColor } from './settings'
    import Subheader from '../../components/Subheader.svelte'

    function saveColor(color){
        backgroundColor.set(color)
    }
</script>

<div class="color-chooser w-100 mb-3">
    <svg viewBox="0 0 22 22" on:click={e => saveColor("#800000")}>
        <use xlink:href="./img/colors.svg#brown" />
    </svg>
    <svg viewBox="0 0 22 22" on:click={e => saveColor("#0000ff")}>
        <use xlink:href="./img/colors.svg#blue" />
    </svg>
    <svg viewBox="0 0 22 22" on:click={e => saveColor("#008000")}>
        <use xlink:href="./img/colors.svg#green" />
    </svg>
    <svg viewBox="0 0 22 22" on:click={e => saveColor("#d45500")}>
        <use xlink:href="./img/colors.svg#orange" />
    </svg>
    <svg viewBox="0 0 22 22" on:click={e => saveColor("#d4aa00")}>
        <use xlink:href="./img/colors.svg#yellow" />
    </svg>
    <svg viewBox="0 0 22 22" on:click={e => saveColor("#800080")}>
        <use xlink:href="./img/colors.svg#purple" />
    </svg>
</div>

<style>
    .color-chooser {
        display: flex;
        justify-content: space-between;
    }
    .color-chooser svg {
        width: 64px;
        height: 64px;
        cursor: pointer;
    }
</style>