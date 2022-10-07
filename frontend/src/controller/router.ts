import { writable, get } from 'svelte/store'
import proxies from '../view/sections'
import { level } from './settings'
import { breakGame } from './tickers'
import { loadLevel } from './loader'

const sections = Array.from(document.querySelectorAll('main > section'))
const showHides: Map<Element, ShowHide> = new Map()
const hash = writable(idFromHash())
const noop = ()=> {}

let lastURL: string

function setupRouter(): void{
  if(isReady()){
    processHash()
    return
  }
  hash.subscribe($hash => {
    if(!isReady()) return
    navigateSection($hash)
  })
  level.subscribe($level => {
    if(!isReady()) return
    breakGame()
    showLoader()
  })
  setupOthers()
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
  processHash()
}

function isReady(){
  return Array.from(showHides.keys()).length > 1
}

function processHash(): void {
  const id = idFromHash()
  if(id === get(hash)) navigateSection(id)
  else hash.set(id)
}

function idFromHash(){
  let id = window.location.hash 
  const hashes = Array.from(showHides.keys()).map($=> `#${$.id}`)
  if(!hashes.includes(id)) id = '#intro'
  return id.substring(1).trim()
}

function navigateSection(id: string){
  hideAll()
  showSection(id)
}

function showLoader(){
  hideAll()
  showSection('loader')
}

function hideAll(): void{
  Array.from(showHides.keys()).forEach(section => hideSection(section))
}

function hideSection(section: string | Element): void{
  section = assureElement(section)
  const {onHide} = showHides.get(section)
  onHide()
  section.classList.add('d-none')
}

function showSection(section: string | Element): void{
  section = assureElement(section)
  const {onShow} = showHides.get(section)
  section.classList.remove('d-none')
  onShow()
}

function assureElement(section: string | Element): Element {
  return typeof section === 'string' ? findSection(section) : section
}

function setupOthers(): void {
  sections.filter($=> $.id !== 'loader').forEach(section => setupSection(section))
}

function setupLoader():  void{
  const loader = findSection('loader')
  setupSection(loader)
  showLoader()
}

function setupSection(target: Element): void{
  const proxy = Reflect.construct(findProxy(target), [{target}])
  const onShow = getOnShow(proxy)
  const onHide = getOnHide(proxy)
  const effects: ShowHide = {onShow, onHide}
  showHides.set(target, effects)
}

function getOnShow(obj: object): CallableFunction{
  return getCallable(obj, 'onShow')
}

function getOnHide(obj: object): CallableFunction{
  return getCallable(obj, 'onHide')
}

function getCallable(obj: object, key: string): CallableFunction{
  const prop = Reflect.get(obj, key)
  return typeof prop === 'function' ? prop : noop
}

function findProxy(section: Element){
  const {id} = section
  const proxy = proxies[id]
  if(!proxy) throw `Proxy is not found by id=${id}`
  return proxy
}

function findSection(id: string){
  return sections.find($=> $.id === id)
}

interface ShowHide {
  onShow: CallableFunction
  onHide: CallableFunction
}

export { hash, setupLoader, setupRouter, showLoader, isReady, processHash }
