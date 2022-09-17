<script>
    import Showdown from 'showdown'
    import PartsOfSpeech from './PartsOfSpeech.svelte'

    const converter = new Showdown.Converter()

    async function content(link) {
        const url = `${link}?r=${Math.random()}`
        const res = await fetch(url)
        if(res.status != 200) throw "Не удалось загрузить запрашиваемый ресурс."
        const text = await res.text()
        const html = converter.makeHtml(text)
        return html
    }
</script>

{#await content('/assets/intro.md') then html}
    {@html html}
{:catch error}
    <div class="alert alert-danger text-center mt-3" role="alert">
        {error}
    </div>
{/await}
<PartsOfSpeech />