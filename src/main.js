import App from './App.svelte'
import Scores from './lib/Scores.svelte'

const app = new App({
  target: document.getElementById('app'),
})

const scores = new Scores({
  target: document.getElementById('scores'),
})

export default app
