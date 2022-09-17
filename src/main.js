import App from './App.svelte'
import Navigation from './components/Navigation.svelte'
import Loader from './components/Loader.svelte'
import Intro from './components/Intro.svelte'
import { processHash } from './lib/router'

const app = new App({
  target: document.getElementById('game'),
})

const scores = new Navigation({
  target: document.getElementById('scores'),
})

const loader = new Loader({
  target: document.getElementById('loader'),
})

const intro = new Intro({
  target: document.getElementById('intro'),
})

processHash()

export default app
