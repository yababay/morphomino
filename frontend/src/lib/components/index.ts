import Alert from './Alert.svelte'
import NavBar from './navbar/index.svelte'
import Loader from './loader/index.svelte'
import { setSvelteComponent } from '../util'
import setupSections from './sections'

export default function(){
    setSvelteComponent(NavBar, 'navbar-links')
    setSvelteComponent(Alert, 'alert')
    setSvelteComponent(Loader, 'loader')
    setupSections()
}
