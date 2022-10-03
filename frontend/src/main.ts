import Navbar from './view/navbar/Navbar.svelte'
import { setSvelteComponent } from './controller/util'
import { setupRouter } from './controller/router'

setSvelteComponent(Navbar, 'scores')
setupRouter()

export default null

