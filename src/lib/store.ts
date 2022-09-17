import { writable, get } from 'svelte/store'
import { PartsOfSpeech, getKeyNames, MorphominoItem } from './models'

const gameTime = writable(0)
const scores = writable(new Array(100).fill(0))

const hashHolder = writable('')
const firstPlayer = writable([])
const secondPlayer = writable([])
const gameFlow = writable([new MorphominoItem, new MorphominoItem])
const alertMessage = writable('')
const gameOver = writable(false)

let moveCount = 0
let gameTimeCounter = null

function startGame() {
    if(gameTimeCounter) clearInterval(gameTimeCounter)
    gameTimeCounter = setInterval(() => {
        const seconds = get(gameTime)
        gameTime.set(seconds + 1)
    }, 1000)
    return Promise.all(new Array(100).fill(0).map(el => moveCount++).map(i => new Promise((yep, nop) => {
        if(typeof get(scores)[i] === 'boolean'){
            yep(null)
            return
        } 
        setTimeout(() => {
            if(get(gameOver)) {
                nop()
                return
            }
            const arrScores = Array.from(get(scores))
            if(arrScores[i] === 0) arrScores[i] = false
            scores.set(arrScores)
            const lastCard = get(gameFlow).at(-1)
            let pos = lastCard.nextPos
            if(pos === PartsOfSpeech.UNDEFINED) pos = PartsOfSpeech.NOUN
            const item = new MorphominoItem(findNextPos(pos))
            gameFlow.set([...get(gameFlow), item])
            yep(i)
        }, 5000 * i)
    })))
}

function makeMove(item, index, val){
    const fromFlow = get(gameFlow).at(-1)
    const isCongeneric = item.isCongeneric(fromFlow)
    if(!isCongeneric) {
      showAlert(`Слово "${item.value}" - не ${fromFlow.longPosName}!`)
      return
    }
    const arr = [...get(scores)]
    let count = 0
    while(typeof arr[count] === 'boolean') count++
    arr[count] = val
    scores.set(arr)
    replaceForFirst(index)
    gameFlow.set([...get(gameFlow), item])
}

function showAlert(msg){
    alertMessage.set(msg)
    setTimeout(() => alertMessage.set(''), 4000)
}

let dictionary = null

function findNextPos(pos: PartsOfSpeech){
    shuffleDictionary()
    return dictionary.find(el => el.pos === pos)
}

function shuffleDictionary(){
    if(dictionary) dictionary.sort(el => Math.random() > .5 ? 1 : -1) 
}

function resetForFirst() {
    firstPlayer.set(getRandomItems())
}

/*Promise.all(getKeyNames().map(key => 
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
    return Promise.resolve()
})
*/
/*.then(() => {
    gameTimeCounter = setInterval(() => {
        const seconds = get(gameTime)
        gameTime.set(seconds + 1)
    }, 1000)
    return Promise.resolve() //robotsGame
})*/
//.then(() => Promise.reject())
//.catch(err => {
    //clearInterval(gameTimeCounter)
//})

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

export { 
    firstPlayer, 
    secondPlayer, 
    gameFlow, 
    alertMessage, 
    scores,
    gameTime,
    gameOver,
    gameTimeCounter,
    hashHolder,
    replaceForFirst, 
    replaceForSecond, 
    showAlert, 
    resetForFirst,
    makeMove,
    findNextPos,
    startGame 
}
