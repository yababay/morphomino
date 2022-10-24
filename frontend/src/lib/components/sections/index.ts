import Settings from './settings/index.svelte'
import Statistics from './statistics/index.svelte'
import { setSvelteComponent } from '../../util'

export default function(){
    setSvelteComponent(Settings, 'settings')
    setSvelteComponent(Statistics, 'statistics')
}

