import './assets/hmf.css'
import './assets/index.css'
import Navbar from './lib/navbar/Navbar.svelte'
import { setSvelteComponent } from './lib/util'
import { hashWithParams, idFromHash, setupRouter, showSection } from '@yababay67/svelte-hash-router-ts'
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
setupRouter(proxies, selector)

/*import { setSvelteComponent } from './lib/util'
import BrandImage from './lib/components/BrandImage.svelte'
import Links from './lib/components/Links.svelte'
import Loader from './lib/sections/loader/Loader.svelte'
import TableOfContent from './lib/toc/TableOfContent.svelte'
import  { loadContent } from './lib/loader'*/

/*document.getElementById('brand-text').textContent = document.title
document.getElementById('copy-year').textContent = `${new Date().getFullYear()}`
setSvelteComponent(BrandImage, 'brand-image')
setSvelteComponent(Links, 'links')
setSvelteComponent(Loader, 'loader')
setSvelteComponent(TableOfContent, 'toc')
loadContent()*/

export default null

