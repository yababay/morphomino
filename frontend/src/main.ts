import './assets/index.css'
import setupComponents from './lib/components'
import setupRouter from './lib/router'
import setupGameSection from './lib/components/sections/game'
import subscribeAll from './lib/store/subscriptions'

const {hash, props} = setupRouter() 
subscribeAll(hash)
setupGameSection(props)
setupComponents()

hash.subscribe(()=> setTimeout(()=> window.scrollTo(0, 0), 1000))

export default null
