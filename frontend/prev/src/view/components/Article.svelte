<script type="ts">
    import Showdown from 'showdown'
    const converter = new Showdown.Converter()

    export let id: string
    export let afterFetch: CallableFunction = (html: string) => html

    async function getHtml() {
        const url = `${`./assets/sections/${id}.md`}?r=${Math.random()}`
        const res = await fetch(url)
        if(res.status > 299) throw "Не удалось загрузить запрашиваемый ресурс."
        const text = await res.text()
        const html = converter.makeHtml(text)
        return afterFetch(html)
    }
</script>

{#await getHtml() then html}
    {@html html}
{:catch error}
    <div class="alert alert-danger text-center mt-3" role="alert">
        {error}
    </div>
{/await}
