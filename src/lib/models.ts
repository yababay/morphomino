enum PartsOfSpeech {
    NOUN,
    PRONOUN,
    VERB,
    ADJECTIVE,
    ADVERB,
    PREPOSITION,
    CONJUNCTION,
    INTERJECTION,
    UNDEFINED
}

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
        return this.nextPos === another.selfPos 
    }

    get value(): string{
        return this.#value.word
    }

    get selfPos(): PartsOfSpeech {
        return this.#value.pos
    }

    get nextPos(): PartsOfSpeech {
        return this.#pos
    }

    get longPosName() {
        return this.#shortPosName
    }

    get shortPosName() {
        return  this.#longPosName
    }
}

function getKeyNames(): string[] {
    return Object.keys(PartsOfSpeech)
        .filter(v => isNaN(Number(v)))
        .filter(v => v !== 'UNDEFINED')
}

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
        default: return PartsOfSpeech.UNDEFINED
    }
}

export { PartsOfSpeech, MorphominoItem, getRandomPos, getKeyNames }
export type { Posable }
