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

    get pos(){return this.#selfPos.value}

    isCongeneric(other: MorminoItem): boolean{
        return this.#nextPos.value === other.pos
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