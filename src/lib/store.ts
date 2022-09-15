import { writable, get } from 'svelte/store'
import { PartsOfSpeech, getKeyNames, MorphominoItem } from './models'

const firstPlayer = writable([])
const secondPlayer = writable([])
const gameFlow = writable([new MorphominoItem, new MorphominoItem])
const alertMessage = writable('')

function showAlert(msg){
    alertMessage.set(msg)
    setTimeout(() => alertMessage.set(''), 4000)
}

let dictionary = null

function resetForFirst() {
    firstPlayer.set(getRandomItems())
}

Promise.all(getKeyNames().map(key => 
        fetch(`./assets/${key.toLowerCase()}s.txt`)
        .then(res => res.text())
        .then(txt => txt.split('\n')
            .map(word => word.trim())
            .map(word => ({pos: PartsOfSpeech[key], word: word && word.trim() || ''}))
            .filter(item => item.word && item.word.length < 13)
        ))
).then(arr => {
    dictionary = arr.reduce((acc, curr) => {
        return [...acc, ...curr]
    }, [])   
    firstPlayer.set(getRandomItems())
    secondPlayer.set(getRandomItems())
    gameFlow.set([...get(gameFlow), getRandomItem()])
})

function getRandomItem(){
    const r = Math.floor(Math.random() * dictionary.length)
    return new MorphominoItem(dictionary[r])
}

function getRandomItems(){
    return new Array(8)
        .fill(0)
        .map(el => getRandomItem())
}

function replaceItem(cards, n) {
    return cards.map((el, i) => i === n ? getRandomItem() : el)
}

function replaceForFirst(n) {
    firstPlayer.set(replaceItem(get(firstPlayer), n))
}

function replaceForSecond(n) {
    firstPlayer.set(replaceItem(get(secondPlayer), n))
}

export { firstPlayer, secondPlayer, replaceForFirst, replaceForSecond, gameFlow, alertMessage, showAlert, resetForFirst }
