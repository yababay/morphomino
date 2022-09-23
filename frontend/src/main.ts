import Navbar from './view/navbar/Navbar.svelte'
import Loader from './view/sections/loader/Loader.svelte'
import { setComponent } from './controller/util'

setComponent(Navbar, 'scores')
setComponent(Loader, 'loader', {id: 'loader'})

export default null

