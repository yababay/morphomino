import { writable, get } from 'svelte/store'
import { withLoader } from '../settings.json'

const progress = writable(0)
const hash = writable('')

let lastURL: string

const sections = Array.from(document.querySelectorAll('main > section'))
const hashes = sections.map(el => el.id)

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
    if(withLoader && get(progress) < 100) return
    let id = window.location.hash 
    if(!id || !id.trim().length) id = '#intro'
    id = id.substring(1).trim()
    if(!hashes.includes(id)) return
    for(const section of sections) {
      if(section.id !== id) {
        hideSection(section)
        continue
      }
      showSection(section)
      hash.set(id)
    }
  }
  
export { hash, progress, processHash }
