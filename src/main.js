import { processHash } from './controller/router'
import sections from './view/sections'
import Navbar from './view/components/Navbar.svelte'
import Alert from './view/components/Alert.svelte'

function getProxyName(id){
  return  `Proxy<${id.split('').map((ch, i) => i === 0 ? ch.toUpperCase() : ch).join('')}>`  
}

function findProxy(id){
  return sections.find(section => section.name === getProxyName(id))
}

Array.from(document.querySelectorAll('main > section')).map(el => el.id).forEach(id => {
  const args = [{target: document.getElementById(id), props: {id}}]
  const constructor = findProxy(id)
  Reflect.construct(constructor, args)
})

Reflect.construct(Navbar, [{target: document.getElementById('scores')}])

Reflect.construct(Alert, [{target: document.getElementById('alert')}])

processHash()
