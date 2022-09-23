import Game       from './game/Game.svelte'
import Intro      from './intro/Intro.svelte'
import Settings   from './settings/Settings.svelte'
import Statistics from './statistics/Statistics.svelte'
import { setComponent } from '../../controller/util'

const proxies = [Game, Intro, Settings, Statistics]

function findProxy(id){
  return proxies.find(section => section.name === getProxyName(id))
}

function getProxyName(id){
  return  `Proxy<${id.split('').map((ch, i) => i === 0 ? ch.toUpperCase() : ch).join('')}>`  
}

const sections = Array.from(document.querySelectorAll('main > section'))

function fulfillSections(){
    sections.map(el => el.id).filter($=> $ !== 'loader').forEach(id => {
      const target = sections.find(section => section.id === id)
      const args = [{target, props: {id}}]
      const Constructor = findProxy(id)
      setComponent(Constructor, id, {id})
    })
}

export { sections, fulfillSections }

