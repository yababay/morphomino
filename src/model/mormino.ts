import { PartsOfSpeech, WordWithPos } from "./types"
import PartOfSpeech from "./pos"

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
}