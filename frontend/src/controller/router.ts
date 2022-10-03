import { writable } from 'svelte/store'
import proxies from '../view/sections'

function setupRouter(): void{
  setupLoader()
  showLoader()
}

function showLoader(){
  hideAll()
  showSection('loader')
}

function hideAll(): void{
  Array.from(showHides.keys()).filter($=> $.id !== 'loader').forEach(section => hideSection(section))
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

const hash = writable('')
const sections = Array.from(document.querySelectorAll('main > section'))
let showHides: Map<Element, ShowHide> = new Map()

interface ShowHide {
  onShow: CallableFunction
  onHide: CallableFunction
}

export { hash, setupRouter, setupOthers, showLoader }

/*
const D_NONE = 'd-none'

const significantSections = getSignificantSections()
const loaderSection = getLoader()
let pages: Map<Element, ShowHide>

function setupHidableSections(proxies: object){
  const keys = Reflect.ownKeys(proxies)
  const hidable = significantSections.filter($=> keys.includes($.id))
  if(hidable.length !== Reflect.ownKeys(proxies).length) throw 'Количество секций не соответствует количеству прокси.'
  const entries = hidable.map(section => {
    const { id } = section
    const Constructor = proxies[id]
    let proxy = getSvelteComponent(Constructor, section)
    const onShow = getOnShow(proxy)
    const onHide = getOnHide(proxy)
    const effects: ShowHide = {onShow, onHide}
    const swe: SectionWithEffects = {section, effects}
    return swe
  })
  pages = new Map(entries.map(({section, effects})=> [section, effects]))
}

function getCallable(obj: object, key: string): CallableFunction{
  const prop = Reflect.get(obj, key)
  return typeof prop === 'function' ? prop : ()=> {} 
}

function getOnShow(obj: object): CallableFunction{
  return getCallable(obj, 'onShow')
}

function getOnHide(obj: object): CallableFunction{
  return getCallable(obj, 'onHide')
}

function showSection(section: string | Element){
  section = assureElement(section)
  section.classList.remove(D_NONE)
  const effects = pages.get(section)
  if(!effects) return
  const {onShow} = effects
  onShow()
}

function hideSection(section: string | Element){
  section = assureElement(section)
  const effects = pages.get(section)
  if(effects){
    const {onHide} = effects
    onHide()
  }
  section.classList.add(D_NONE)
}

function hideSections(sections: Element[]){
  sections.forEach(hideSection)
}

function hideAllPages(){
  hideSections(Array.from(pages.keys()))
}

function getSection(id){
  return significantSections.find($=> $.id === id)
}

function getLoader(){
  return getSection('loader')
}

function hideLoader(){
  hideSection(loaderSection)
  setHash()
}

function showLoader(){
  hideAllPages()
  showSection(loaderSection)
}

const hash = writable('')

hash.subscribe($hash => {
  const current = getSection($hash)
  if(!current) return
  hideAllPages()
  showSection($hash)
})

let lastURL: string

function setupHashListener(proxies: object){
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
    setHash()
  })

  setupHidableSections(proxies)
  hideLoader()
}

function setHash(){
  let id = window.location.hash 
  if(id === '#loader'){
    showLoader()
    return
  }
  const hashes = Array.from(pages.keys()).map($=> `#${$.id}`)
  if(!hashes.includes(id)) id = '#intro'
  id = id.substring(1).trim()
  hideLoader()
  hash.set(id)
}

export { setupHashListener, hash }
*/