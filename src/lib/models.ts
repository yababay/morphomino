enum PartsOfSpeech {
    NOUN,
    PRONOUN,
    VERB,
    ADJECTIVE,
    ADVERB,
    PREPOSITION,
    CONJUNCTION,
    INTERJECTION,
    NUMERAL,
    PARTICLE,
    UNDEFINED
}

interface WordWithPos {
    word: string
    pos: PartsOfSpeech
}

interface PosDescription {
    pos: PartsOfSpeech
    nominative: string
    genetive: string
    shortName: string
    shortestName: string
}

const descriptions: object = {
    [PartsOfSpeech.NOUN]:         ["существительное", "существительных", "существ.", "сущ."],
    [PartsOfSpeech.PRONOUN]:      ["местоимение", "местоимений", "местоим.", "мест"],
    [PartsOfSpeech.VERB]:         ["глагол", "глаголов", "глагол", "глаг."],
    [PartsOfSpeech.ADJECTIVE]:    ["прилагательное", "прилагательных", "прилаг.", "прил."],
    [PartsOfSpeech.ADVERB]:       ["наречие", "наречий", "наречие", "нар."],
    [PartsOfSpeech.PREPOSITION]:  ["предлог", "предлогов", "предлог", "предл."],
    [PartsOfSpeech.CONJUNCTION]:  ["союз", "союзов", "союз", "союз"],
    [PartsOfSpeech.INTERJECTION]: ["междометие", "междометий", "междом.", "межд."],
    [PartsOfSpeech.NUMERAL]:      ["числительное", "числительных", "числит.", "числ."],
    [PartsOfSpeech.PARTICLE]:     ["частица", "частиц", "частица", "част."],
    [PartsOfSpeech.UNDEFINED]:    ["", "", "", ""]
}

function getPosDescription(_pos: PartsOfSpeech | string): PosDescription{
    let pos: PartsOfSpeech = typeof _pos !== 'string' && _pos || PartsOfSpeech[_pos]
    const descr = descriptions[pos]
    if(!descr) throw 'Не удалось определить характеристики части речи.'
    const [nominative, genetive, shortName, shortestName] = descr
    return {pos, nominative, genetive, shortName, shortestName}
}

function getKeyNames(): string[] {
    return Object.keys(PartsOfSpeech)
        .filter(v => isNaN(Number(v)))
}

/*
Глаголов 37319;
Существительных 56332
Прилагательных 24786
Местоимений 93
Наречий 1916 	Числительных 117
Междометий 341
Союзов 110
Предлогов 141
Частиц 149
*/

function setStatistics(pos: PartsOfSpeech, amount: number){
    posStatistics[pos] = amount
}

const posStatistics = {
    /*[PartsOfSpeech.NOUN]: 56332,
    [PartsOfSpeech.PRONOUN]: 93,
    [PartsOfSpeech.VERB]: 37319,
    [PartsOfSpeech.ADJECTIVE]: 24786,
    [PartsOfSpeech.ADVERB]: 1916,
    [PartsOfSpeech.PREPOSITION]: 141,
    [PartsOfSpeech.CONJUNCTION]: 110,
    [PartsOfSpeech.INTERJECTION]: 341,
    [PartsOfSpeech.NUMERAL]: 117,
    [PartsOfSpeech.PARTICLE]: 149*/
}

/*const posRepresentation = Object.entries(posStatistics)
    .map(entry => new Array(entry[1]).fill(entry[0]))
    .reduce((acc, curr) => [...acc, ...curr])
    .sort(el => Math.random() > .5 && 1 || -1)*/

class MorphominoItem {

    #value: WordWithPos
    #pos: PartsOfSpeech
    #shortPosName: string
    #longPosName: string
    #isWon: boolean = false

    constructor(value: WordWithPos = {word: '', pos: PartsOfSpeech.UNDEFINED}, pos: PartsOfSpeech = getRandomPos()){
        this.#value = value
        this.#pos = value.pos === PartsOfSpeech.UNDEFINED ? PartsOfSpeech.UNDEFINED : pos
        const descr =  descriptions[this.#pos]
        if(typeof descr === 'string'){
            this.#shortPosName = descr
            this.#longPosName = descr
            return
        }
        this.#shortPosName = descr[0]
        this.#longPosName = descr[1]
    }

    isCongeneric(another: MorphominoItem) {
        return this.selfPos === another.nextPos 
    }

    addScore(){
        this.#isWon = true
    }

    get isWon(){
        return this.#isWon
    }

    get value(): string{
        return this.#value.word
    }

    get selfPos(): PartsOfSpeech {
        return assureNumber(this.#value.pos)
    }

    get nextPos(): PartsOfSpeech {
        return assureNumber(this.#pos)
    }

    get longPosName() {
        return this.#shortPosName
    }

    get shortPosName() {
        return  this.#longPosName
    }

    isEmpty(): boolean{
        return this.#value.pos === PartsOfSpeech.UNDEFINED
    }
}

function assureNumber(val){
    return typeof val === 'number' && val || parseInt(val)
}


/*function getRandomPosRepresentable() : PartsOfSpeech{
    const {length} = posRepresentation
    const rand = Math.random() * length
    const floor = Math.floor(rand)
    return posRepresentation[floor]
}*/

function getRandomPos(): PartsOfSpeech {
    const {length} = getKeyNames()
    const rand = Math.random() * length
    const floor = Math.floor(rand)
    switch(floor){
        case 0: return PartsOfSpeech.NOUN
        case 1: return PartsOfSpeech.PRONOUN
        case 2: return PartsOfSpeech.VERB
        case 3: return PartsOfSpeech.ADJECTIVE
        case 4: return PartsOfSpeech.ADVERB
        case 5: return PartsOfSpeech.PREPOSITION
        case 6: return PartsOfSpeech.CONJUNCTION
        case 7: return PartsOfSpeech.INTERJECTION
        case 8: return PartsOfSpeech.NUMERAL
        case 9: return PartsOfSpeech.PARTICLE
        default: return PartsOfSpeech.UNDEFINED
    }
}

export { PartsOfSpeech, MorphominoItem, getPosDescription, getRandomPos, getKeyNames, setStatistics }
export type { WordWithPos }
