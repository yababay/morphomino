<script lang="ts">
    import { hideElement, showElement } from '@yababay67/svelte-hash-router-ts'
    import { delayedAction } from '../../util'

    export let level: string = '5_1'

    const loaderCard = document.querySelector('#loader .card')
    const loaderImage = loaderCard.querySelector('img')

    export const loader = async ()=> {
        hideElement(loaderCard)
        loaderImage.setAttribute('src', `./img/level-${level}.png`)        
        await delayedAction(200)
        showElement(loaderCard)
        await delayedAction(2000)
    }
</script>

<p>{level}</p>
