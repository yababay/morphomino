import { writable, get } from 'svelte/store'
import proxies from '../view/sections'

const sections = Array.from(document.querySelectorAll('main > section'))
const showHides: Map<Element, ShowHide> = new Map()
const hash = writable(idFromHash())
let lastURL: string

function idFromHash(){
  let id = window.location.hash 
  const hashes = Array.from(showHides.keys()).map($=> `#${$.id}`)
  if(!hashes.includes(id)) id = '#intro'
  return id.substring(1).trim()
}

function processHash(): void {
  const id = idFromHash()
  if(id === get(hash)) navigateSection(id)
  else hash.set(id)
}

function navigateSection(id: string){
  hideAll(true)
  showSection(id)
}

function setupRouter(): void{
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
  hash.subscribe(navigateSection)
}

function showLoader(){
  hideAll()
  showSection('loader')
}

function hideAll(includingLoader = false): void{
  Array.from(showHides.keys()).filter($=> includingLoader || $.id !== 'loader').forEach(section => hideSection(section))
}

function hideLoader(){
  hideSection('loader')
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

const noop = ()=> {}

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

export { hash, setupLoader, setupRouter }
