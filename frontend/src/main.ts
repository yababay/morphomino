import './assets/hmf.css'
import './assets/index.css'

import setup from './lib/router'
import { setSvelteComponent } from './lib/util'
import NavBar from './lib/navbar/index.svelte'
import Settings from './lib/sections/settings/index.svelte'
import Statistics from './lib/sections/statistics/index.svelte'
import Loader from './lib/sections/loader/index.svelte'
import loadLevel from './lib/sections/loader'
import subscribe from './lib/store/subscriptions'
import { delayedAction } from './lib/util'

setSvelteComponent(Loader, 'loader')
loadLevel()
    .then(() => {
        const {hash, props} = setup()
        setSvelteComponent(Settings, 'settings')
        setSvelteComponent(Statistics, 'statistics')
        setSvelteComponent(NavBar, 'navbar-links', {hash})
        subscribe(hash, props)
    })

export default null
