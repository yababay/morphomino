import './assets/index.css'
import setupComponents from './lib/components'
import setupRouter from '@yababay67/svelte-hash-router-ts'
import setupGameSection from './lib/components/sections/game'
import subscribeAll from './lib/store/subscriptions'

const {hash, props} = setupRouter() 
subscribeAll(hash)
setupGameSection(props)
setupComponents()

export default null
