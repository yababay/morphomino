import { processHash } from './lib/router'
import { sections } from './components'
import Navbar from './components/navbar/Navbar.svelte'

const getProxyName = id => `Proxy<${id.split('').map((ch, i) => i === 0 ? ch.toUpperCase() : ch).join('')}>`
const findProxy = id => sections.find(section => section.name === getProxyName(id))

Array.from(document.querySelectorAll('main > section')).map(el => el.id).forEach(id => {
  const args = [{target: document.getElementById(id)}]
  const constructor = findProxy(id)
  Reflect.construct(constructor, args)
})

const scores = new Navbar({
  target: document.getElementById('scores'),
})

processHash()
