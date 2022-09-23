import { PartsOfSpeech, WordWithPos } from "./types"
import { getRandomIndex } from "../controller/util"
import PartOfSpeech from "./pos"

let dictionary: WordWithPos[] = null

export default class MorminoItem {

    #selfPos: PartOfSpeech
    #nextPos: PartOfSpeech
    #word: string

    constructor(word: WordWithPos = {word: '', pos: PartsOfSpeech.UNDEFINED}, next: PartOfSpeech = new PartOfSpeech){
        this.#selfPos = new PartOfSpeech(word.pos)
        this.#word = word.word
        this.#nextPos = next
    }

    get word(){return this.#word}

    get selfPos(){return this.#selfPos.value}

    get nextfPos(){return this.#nextPos.value}

    get selfNomenative(){return this.#selfPos.nominative}

    get selfGenetive(){return this.#selfPos.genetive}

    get selfShortName(){return this.#selfPos.shortName}

    get selfShortestName(){return this.#selfPos.shortestName}

    get nextNomenative(){return this.#nextPos.nominative}

    get nextGenetive(){return this.#nextPos.genetive}

    get nextShortName(){return this.#nextPos.shortName}

    get nextShortestName(){return this.#nextPos.shortestName}

    isCongeneric(other: MorminoItem): boolean{
        return this.#nextPos.value === other.selfPos
    }

    isUndefined(): boolean {
        return this.#selfPos.value === PartsOfSpeech.UNDEFINED
    }

    static setDictionary(dict: WordWithPos[]){
        dictionary = dict
    }

    static getRandomItem(): MorminoItem {
        const word = dictionary[getRandomIndex(dictionary)]
        const pos = PartOfSpeech.getRandomPos()
        return new MorminoItem(word, pos)
    }
}