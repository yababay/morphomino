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
    [PartsOfSpeech.ADVERB_CE]:      ["наречие цели", "наречий цели", "нар. цели", "нар. ц."],
    [PartsOfSpeech.ADVERB_ME]:      ["наречие места", "наречий места", "нар. места", "нар. м."],
    [PartsOfSpeech.ADVERB_MS]:      ["наречие меры и степени", "наречий меры и степени", "нар. м. и ст.", "нар м. с."],
    [PartsOfSpeech.ADVERB_OD]:      ["наречие образа действия", "наречий образа действия", "нар. об. дейст.", "нар о.д."],
    [PartsOfSpeech.ADVERB_OTR]:     ["наречие отрицательное", "наречий отрицательных", "нар. отр.", "нар. о."],
    [PartsOfSpeech.ADVERB_PR]:      ["наречие причины", "наречий причины", "нар. прич.", "нар. п."],
    [PartsOfSpeech.ADVERB_UK]:      ["наречие указательное", "наречий указательных", "нар. указ.", "нар. у."],
    [PartsOfSpeech.ADVERB_VR]:      ["наречие времени", "наречий времени", "нар. врем.", "нар. в."],
    [PartsOfSpeech.CATEGORYS]:      ["категория состояния", "категорий состояния", "катег. сост.", "кат. с."],
    [PartsOfSpeech.GERUND_NSV]:     ["депричастие несовершенного вида", "деепричастий несовершенного вида", "деепр. несов. в.", "дееп. н. в."],
    [PartsOfSpeech.GERUNDS]:        ["депричастие", "деепричастий", "дееприч.", "деепр."],
    [PartsOfSpeech.GERUND_SV]:      ["депричастие совершенного вида", "депричастий совершенного вида", "деепр. сов. в.", "дееп. с. в."],
    [PartsOfSpeech.ONOMATOPOEIAS]:  ["звукоподражание", "звукоподражаний", "звукоподр.", "зв/подр."],
    [PartsOfSpeech.PARTICIPLE_D]:   ["причастие действительное", "причастий действительных", "прич. действ.", "прич. д."],
    [PartsOfSpeech.PARTICIPLE_S]:   ["причастие страдательное", "причастий страдательных", "прич. страд.", "прич. с."],
    [PartsOfSpeech.PARTICIPLES]:    ["причастие", "причастий", "причаст.", "прич."],
    [PartsOfSpeech.PARTICLE_F]:     ["частица формообразующая", "частиц формообразующих", "част. форм.", "част. ф."],
    [PartsOfSpeech.PARTICLE_MOD]:   ["частица модальная", "частиц модальных", "част. мод.", "част. м."],
    [PartsOfSpeech.PARTICLE_OTR]:   ["частица отрицательная", "частиц отрицательных", "част. отриц.", "част. о."],
    [PartsOfSpeech.PREPOSITION_NP]: ["предлог непроизводный", "предлогов непроизводных", "предл. непр.", "предл. н."],
    [PartsOfSpeech.PREPOSITION_PR]: ["предлог производный", "предлогов производных", "предл. произ.", "предл. п."],
    [PartsOfSpeech.UNION_P]:        ["союз подчинительный", "союзов подчинительных", "союз подч.", "союз п."],
    [PartsOfSpeech.UNION_S]:        ["союз сочинительный", "союзов сочинительных", "союз соч.", "союз с."],
    [PartsOfSpeech.UNIONS]:         ["союз", "союзов", "союз", "союз"],
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
