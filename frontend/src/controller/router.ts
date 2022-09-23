import { writable, get } from 'svelte/store'
import { sections } from '../view/sections'

const hash = writable('')

let lastURL: string

const hashes = sections.map((el: Element) => el.id)

function assureElement(section: string | Element): Element{
  return typeof section === 'string' ? sections.find(el => el.id === section) : section
}

function showSection(section: string | Element){
  assureElement(section).classList.remove('d-none')
}

function hideSection(section: string | Element){
  assureElement(section).classList.add('d-none')
}

function setHashListener() {
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
}

function hideAllSections(){
  for(const section of sections) hideSection(section)
}

function processHash(){
    let id = window.location.hash 
    if(!id || !id.trim().length) id = '#intro'
    id = id.substring(1).trim()
    if(!hashes.includes(id)) return
    hideAllSections()
    showSection(id)
    hash.set(id)
  }
  
export { hash, processHash, setHashListener, showSection, hideSection, hideAllSections }
