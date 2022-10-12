<script type="ts">
    import Article from '../../components/Article.svelte'

    let id = 'game'

    function afterFetch(txt: string): string {
        return txt.replace('<p>', '<span>').replace('</p>', '</span>')
    }
</script>

<div class="alert alert-success alert-dismissible fade show text-center" role="alert">
    <Article {id} {afterFetch} />
</div>

<!-- div class="instruction">
    <div class="card">
        <img src="assets/img/level-7_1.png" class="card-img-top" alt="Инструкция">
        <div class="card-body">
          <h5 class="card-title">Краткая инструкция</h5>
          <Article {id} {afterFetch} />
          <div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated w-100" role="progressbar" aria-label="Игра начитается..." 
                    aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                </div>
          </div>
        </div>
    </div>
</div -->

<!-- style>
    .instruction {
        max-width: 80ch;
    }
    .instruction .card {
        width: 100%;
        max-width: 640px;
    }
    .instruction .progress {
        width: 100%;
    }
</style -->