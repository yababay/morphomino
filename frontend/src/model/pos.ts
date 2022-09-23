/*

Части речи

В русском языке насчитывается:

Глаголов 37319;
Существительных 56332
Прилагательных 24786
Местоимений 93
Наречий 1916 	
Числительных 117
Междометий 341
Союзов 110
Предлогов 141
Частиц 149

*/

import { PartsOfSpeech } from "./types"
import { getRandomIndex } from "../controller/util"

const descriptions: object = {
    [PartsOfSpeech.NOUNS]:          ["существительное", "существительных", "существ.", "сущ."],
    [PartsOfSpeech.PRONOUNS]:       ["местоимение", "местоимений", "местоим.", "мест"],
    [PartsOfSpeech.VERBS]:          ["глагол", "глаголов", "глагол", "глаг."],
    [PartsOfSpeech.ADJECTIVES]:     ["прилагательное", "прилагательных", "прилаг.", "прил."],
    [PartsOfSpeech.ADVERBS]:        ["наречие", "наречий", "наречие", "нар."],
    [PartsOfSpeech.PREPOSITIONS]:   ["предлог", "предлогов", "предлог", "предл."],
    [PartsOfSpeech.CONJUNCTIONS]:   ["союз", "союзов", "союз", "союз"],
    [PartsOfSpeech.INTERJECTIONS]:  ["междометие", "междометий", "междом.", "межд."],
    [PartsOfSpeech.NUMERALS]:       ["числительное", "числительных", "числит.", "числ."],
    [PartsOfSpeech.PARTICLES]:      ["частица", "частиц", "частица", "част."],
    [PartsOfSpeech.ADVERB_CE]:      ["", "", "", ""],
    [PartsOfSpeech.ADVERB_ME]:      ["", "", "", ""],
    [PartsOfSpeech.ADVERB_MS]:      ["", "", "", ""],
    [PartsOfSpeech.ADVERB_OD]:      ["", "", "", ""],
    [PartsOfSpeech.ADVERB_OTR]:     ["", "", "", ""],
    [PartsOfSpeech.ADVERB_PR]:      ["", "", "", ""],
    [PartsOfSpeech.ADVERB_UK]:      ["", "", "", ""],
    [PartsOfSpeech.ADVERB_VR]:      ["", "", "", ""],
    [PartsOfSpeech.CATEGORYS]:      ["", "", "", ""],
    [PartsOfSpeech.GERUND_NSV]:     ["", "", "", ""],
    [PartsOfSpeech.GERUNDS]:        ["", "", "", ""],
    [PartsOfSpeech.GERUND_SV]:      ["", "", "", ""],
    [PartsOfSpeech.ONOMATOPOEIAS]:  ["", "", "", ""],
    [PartsOfSpeech.PARTICIPLE_D]:   ["", "", "", ""],
    [PartsOfSpeech.PARTICIPLE_S]:   ["", "", "", ""],
    [PartsOfSpeech.PARTICIPLES]:    ["", "", "", ""],
    [PartsOfSpeech.PARTICLE_F]:     ["", "", "", ""],
    [PartsOfSpeech.PARTICLE_MOD]:   ["", "", "", ""],
    [PartsOfSpeech.PARTICLE_OTR]:   ["", "", "", ""],
    [PartsOfSpeech.PREPOSITION_NP]: ["", "", "", ""],
    [PartsOfSpeech.PREPOSITION_PR]: ["", "", "", ""],
    [PartsOfSpeech.UNION_P]:        ["", "", "", ""],
    [PartsOfSpeech.UNION_S]:        ["", "", "", ""],
    [PartsOfSpeech.UNIONS]:         ["", "", "", ""],
    [PartsOfSpeech.UNDEFINED]:      ["", "", "", ""]
}

let statistics: PartsOfSpeech[] = null

export default class PartOfSpeech {

    #pos: PartsOfSpeech
    #nominative: string
    #genetive: string 
    #shortName: string 
    #shortestName: string

    constructor(pos: PartsOfSpeech | string = PartsOfSpeech.UNDEFINED){
        this.#pos = typeof pos !== 'string' ? pos : PartsOfSpeech[pos]
        const descr = descriptions[this.#pos]
        if(!descr) throw `Не удалось определить характеристики части речи по ключу ${pos}.`
        const [nominative, genetive, shortName, shortestName] = descr
        this.#nominative = nominative
        this.#genetive = genetive
        this.#shortName = shortName
        this.#shortestName = shortestName
    }

    get nominative(){return this.#nominative} 
    get genetive(){return this.#genetive}
    get shortName(){return this.#shortName}
    get shortestName(){return this.#shortestName}
    get value(){return this.#pos}
    get key(){return PartsOfSpeech[this.#pos]}

    static getKeyNames(withoutUndefined: boolean = true): string[] {
        return Object.keys(PartsOfSpeech)
            .filter(v => isNaN(Number(v)))
            .filter(v => withoutUndefined && v !== 'UNDEFINED' || false)
    }

    static getRandomPosType(): PartsOfSpeech {
        return statistics[getRandomIndex(statistics)]
    }

    static getRandomPos(): PartOfSpeech {
        return new PartOfSpeech(PartOfSpeech.getRandomPosType())
    }

    static setStatistics(stats: PartsOfSpeech[]): void{
        statistics = stats
    }

    static getStatistics(pos: PartsOfSpeech): number{
        return statistics.filter($=> $ === pos).length
    }
}
