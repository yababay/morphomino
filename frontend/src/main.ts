import './assets/hmf.css'
import './assets/index.css'
import Navbar from './lib/navbar/Navbar.svelte'
import Alert from './lib/sections/game/Alert.svelte'
import { setSvelteComponent } from './lib/util'
import { hash as hashStore, hashWithParams, idFromHash, setupRouter, showSection } from '@yababay67/svelte-hash-router-ts'
import proxies from './lib/sections'

const selector = 'main > section'

hashWithParams.subscribe($ => {
    if(typeof $ === 'string') return
    const {hash, props} = $
    const id = idFromHash(hash, selector)
    const force = id === 'article'
    showSection(id, proxies, selector, props)
})

setSvelteComponent(Navbar, 'links')
setSvelteComponent(Alert, 'alert')
setupRouter(proxies, selector)

let {hash} = window.location
let props = {}

if(hash && hash.trim() && hash.includes('?')) {
    const [h, q] = hash.split('?')
    hash = h
    props = Object.fromEntries(new URLSearchParams(q).entries())
}

hashStore.set(window.location.hash)

export default null
