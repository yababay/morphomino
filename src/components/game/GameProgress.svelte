<script>
    import { scores } from './store'
</script>
<section class="scores">
    {#each $scores as score }
        <div class="score" class:neutral={score === 0} class:success={score === true} class:failure={score === false}></div>
    {/each}
</section>

<style>
    .scores {
        display: flex;
        flex-wrap: wrap;
        max-width: 1200px;
        margin: 1rem auto;
    }

    .score {
        width: 1.2rem;
        height: 1rem;
        margin: .3rem 0 0 .3rem;
    }

    .neutral {
        background-color: lightgray;
    }

    .success {
        background-color: green;
    }

    .failure {
        background-color: red;
    }        
</style>