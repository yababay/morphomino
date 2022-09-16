import App from './App.svelte'
import Navigation from './lib/Navigation.svelte'
import { startGame, gameOver, hashHolder } from './lib/store'

const app = new App({
  target: document.getElementById('game'),
})

const scores = new Navigation({
  target: document.getElementById('scores'),
})

let lastURL

const sectionIds = ['intro', 'settings', 'statistics', 'game']
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
  processHash()
})

function processHash(){
  let {hash} = window.location 
  if(!hash || !hash.trim().length) hash = '#intro'
  hash = hash.substring(1).trim()
  if(!sectionIds.includes(hash)) return
  for(const section of sections) {
    if(section.getAttribute('id') === hash) section.classList.remove('d-none')
    else section.classList.add('d-none')
  }
  hashHolder.set(hash)
  if(hash === 'game') (async function(){
    gameOver.set(false)
    await startGame()
  })()
  else {
    gameOver.set(true)
  }
}

processHash()

export default app
