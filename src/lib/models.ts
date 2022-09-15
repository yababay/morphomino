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

const posStatistics = {
    [PartsOfSpeech.NOUN]: 56332,
    [PartsOfSpeech.PRONOUN]: 93,
    [PartsOfSpeech.VERB]: 37319,
    [PartsOfSpeech.ADJECTIVE]: 24786,
    [PartsOfSpeech.ADVERB]: 1916,
    [PartsOfSpeech.PREPOSITION]: 141,
    [PartsOfSpeech.CONJUNCTION]: 110,
    [PartsOfSpeech.INTERJECTION]: 341,
    [PartsOfSpeech.NUMERAL]: 117,
    [PartsOfSpeech.PARTICLE]: 149
}

const posRepresentation = Object.entries(posStatistics)
    .map(entry => new Array(entry[1]).fill(entry[0]))
    .reduce((acc, curr) => [...acc, ...curr])
    .sort(el => Math.random() > .5 && 1 || -1)

interface Posable {
    word: string,
    pos: PartsOfSpeech
}

const descriptions: object = {
    [PartsOfSpeech.NOUN]: ["существительное", "существ."],
    [PartsOfSpeech.PRONOUN]: ["местоимение", "местоим."],
    [PartsOfSpeech.VERB]: "глагол",
    [PartsOfSpeech.ADJECTIVE]: ["прилагательное", "прилаг."],
    [PartsOfSpeech.ADVERB]: "наречие",
    [PartsOfSpeech.PREPOSITION]: "предлог",
    [PartsOfSpeech.CONJUNCTION]: "союз",
    [PartsOfSpeech.INTERJECTION]: ["междометие", "междом."],
    [PartsOfSpeech.NUMERAL]: ["числительное", "числит."],
    [PartsOfSpeech.PARTICLE]: "частица",
    [PartsOfSpeech.UNDEFINED]: ""
}

class MorphominoItem {

    #value: Posable
    #pos: PartsOfSpeech
    #shortPosName: string
    #longPosName: string

    constructor(value: Posable = {word: '', pos: PartsOfSpeech.UNDEFINED}, pos: PartsOfSpeech = getRandomPos()){
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
}

function assureNumber(val){
    return typeof val === 'number' && val || parseInt(val)
}

function getKeyNames(): string[] {
    return Object.keys(PartsOfSpeech)
        .filter(v => isNaN(Number(v)))
        .filter(v => v !== 'UNDEFINED')
}

function getRandomPos() : PartsOfSpeech{
    const {length} = posRepresentation
    const rand = Math.random() * length
    const floor = Math.floor(rand)
    return posRepresentation[floor]
}

function getRandomPosPrev(): PartsOfSpeech {
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
        default: return PartsOfSpeech.UNDEFINED
    }
}

export { PartsOfSpeech, MorphominoItem, getRandomPos, getKeyNames }
export type { Posable }
