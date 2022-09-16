import App from './App.svelte'
import Navigation from './lib/Navigation.svelte'
import Loader from './lib/Loader.svelte'
import { processHash } from './router'

/*import { startGame, gameOver, hashHolder } from './lib/store'*/

const app = new App({
  target: document.getElementById('game'),
})

const scores = new Navigation({
  target: document.getElementById('scores'),
})

const loader = new Loader({
  target: document.getElementById('loader'),
})

processHash()

export default app
