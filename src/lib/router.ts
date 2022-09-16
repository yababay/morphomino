import { get } from 'svelte/store'
import { loader } from './dictionary'

let lastURL

const sectionIds = ['intro', 'settings', 'statistics', 'game', 'loader']
const sections = sectionIds.map(id => document.getElementById(id))

function findSection(id){
  return sections.find(el => el.id === id)
}

function showSection(id){
  findSection(id).classList.remove('d-none')
}

function hideSection(id){
  findSection(id).classList.add('d-none')
}

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
    if(get(loader) < 100) return
    /*let {hash} = window.location 
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
    }*/
  }
  
export { processHash, showSection, hideSection }
  