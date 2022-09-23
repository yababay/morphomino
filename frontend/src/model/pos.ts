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

let statistics: PartsOfSpeech[] = null

export default class PartOfSpeech {

    #pos: PartsOfSpeech
    #nominative: string
    #genetive: string 
    #shortName: string 
    #shortestName: string

    constructor(pos: PartsOfSpeech | string = PartsOfSpeech.UNDEFINED){
        this.#pos = typeof pos !== 'string' && pos || PartsOfSpeech[pos]
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
