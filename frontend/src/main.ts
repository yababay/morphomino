import './assets/hmf.css'
import './assets/index.css'

import setup from './lib/router'
import { setSvelteComponent } from './lib/util'
import NavBar from './lib/navbar/index.svelte'
import Settings from './lib/sections/settings/index.svelte'
import Statistics from './lib/sections/statistics/index.svelte'
import Loader from './lib/sections/loader/index.svelte'
import Alert from './lib/components/Alert.svelte'
import subscribe from './lib/store/subscriptions'

setSvelteComponent(Loader, 'loader')
const {hash, props} = setup()
setSvelteComponent(Alert, 'alert')
setSvelteComponent(Settings, 'settings')
setSvelteComponent(Statistics, 'statistics')
setSvelteComponent(NavBar, 'navbar-links', {hash})
subscribe(hash, props)

export default null
