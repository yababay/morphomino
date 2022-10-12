<script lang="ts">
    import { hideElement, showElement } from '@yababay67/svelte-hash-router-ts'
    import { delayedAction } from '../../util'
    import { level as levelStore } from '../settings/settings'
    import loadLevel from './loader'

    export let level: string = ""

    if(!level) level = `${$levelStore}`
    else levelStore.set(level)

    const loaderCard = document.querySelector('#loader .card')
    const loaderImage = loaderCard.querySelector('img')

    export const loader = async ()=> {
        hideElement(loaderCard)
        loaderImage.setAttribute('src', `./img/level-${level}.png`)        
        await delayedAction(200)
        showElement(loaderCard)
        await loadLevel(level)
        await delayedAction(2000)
    }
</script>

<p>{level}</p>
