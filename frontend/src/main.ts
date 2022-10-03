import Navbar from './view/navbar/Navbar.svelte'
import { setSvelteComponent } from './controller/util'
import { setupLoader } from './controller/router'

setSvelteComponent(Navbar, 'scores')
setupLoader()

export default null
