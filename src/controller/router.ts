import { writable, get } from 'svelte/store'
import { withLoader } from '../settings.json'

//import { loader } from './dictionary'
//import { startGame, stopGame } from './game'

const hash = writable('')
const loader = writable(0)
let lastURL: string

const sectionIds = ['intro', 'settings', 'statistics', 'game', 'loader']
const sections = sectionIds.map(id => document.getElementById(id))

function assureElement(section: any){
  return typeof section === 'string' && sections.find(el => el.id === section) || section
}

function showSection(section){
  assureElement(section).classList.remove('d-none')
}

function hideSection(section){
  assureElement(section).classList.add('d-none')
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
    if(withLoader && get(loader) < 100) return
    let _hash = window.location.hash 
    if(!_hash || !_hash.trim().length) _hash = '#intro'
    _hash = _hash.substring(1).trim()
    if(!sectionIds.includes(_hash)) return
    for(const section of sections) {
      if(section.getAttribute('id') === _hash) section.classList.remove('d-none')
      else section.classList.add('d-none')
    }
    hash.set(_hash)
//    if(_hash === 'game') startGame()
//    else stopGame()
  }
  
export { processHash, hash }
