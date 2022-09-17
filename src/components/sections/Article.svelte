<script>
    import Showdown from 'showdown'
    const converter = new Showdown.Converter()

    export let id, afterFetch

    async function getHtml() {
        const url = `${`./assets/${id}.md`}?r=${Math.random()}`
        const res = await fetch(url)
        if(res.status > 299) throw "Не удалось загрузить запрашиваемый ресурс."
        const text = await res.text()
        const html = converter.makeHtml(text)
        return typeof afterFetch === 'function' && afterFetch(html) || html
    }
</script>

{#await getHtml() then html}
    {@html html}
{:catch error}
    <div class="alert alert-danger text-center mt-3" role="alert">
        {error}
    </div>
{/await}
