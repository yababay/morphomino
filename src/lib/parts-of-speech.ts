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

const descriptions: object = {
    [PartsOfSpeech.NOUN]: ["существительное", "существ."],
    [PartsOfSpeech.PRONOUN]: ["местоимение", "местоим."],
    [PartsOfSpeech.VERB]: "глагол",
    [PartsOfSpeech.ADJECTIVE]: ["прилагательное", "прилаг."],
    [PartsOfSpeech.ADVERB]: "наречие",
    [PartsOfSpeech.PREPOSITION]: "предлог",
    [PartsOfSpeech.CONJUNCTION]: "союз",
    [PartsOfSpeech.INTERJECTION]: ["междометие", "междом."]
}

class MorphominoItem {

    #value: string
    #pos: PartsOfSpeech
    #shortPosName: string
    #longPosName: string

    constructor(value: string, pos: PartsOfSpeech = getRandomPos()){
        this.#value = value
        this.#pos = pos
        const descr =  descriptions[pos]
        if(typeof descr === 'string'){
            this.#shortPosName = descr
            this.#longPosName = descr
            return
        }
        this.#shortPosName = descr[0]
        this.#longPosName = descr[1]
    }

    isCongeneric(another: MorphominoItem) {
        return this.#pos === another.pos 
    }

    get value(){
        return this.#value
    }

    get pos() {
        return this.#pos
    }

    get longPosName() {
        return this.#shortPosName
    }

    get shortPosName() {
        return  this.#longPosName
    }
}

function getRandomPos(): PartsOfSpeech {
    const {length} = Object.keys(PartsOfSpeech).filter(v => isNaN(Number(v)))
    const rand = Math.random() * (length - 1)
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

export { PartsOfSpeech, MorphominoItem, getRandomPos }
