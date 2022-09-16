import App from './App.svelte'
import Scores from './lib/Scores.svelte'

const app = new App({
  target: document.getElementById('game'),
})

const scores = new Scores({
  target: document.getElementById('scores'),
})

let lastURL

const sectionIds = ['intro', 'settings', 'game']
const sections = sectionIds.map(id => document.getElementById(id))

window.addEventListener('hashchange', function (event) {
  Object.defineProperty(event, 'oldURL', {
    enumerable: true,
    configurable: true,
    value: lastURL,
  });
  Object.defineProperty(event, 'newURL', {
    enumerable: true,
    configurable: true,
    value: document.URL,
  });
  lastURL = document.URL
  let {hash} = window.location 
  if(!hash || !hash.length) return
  hash = hash.substring(1)
  if(!sectionIds.includes(hash)) return
  for(const id of sectionIds) {

  }
})

export default app
