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
    [PartsOfSpeech.ADVERB_MS]:      ["наречие меры и степени", "наречий меры и степени", "нар. м.ст.", "нар м. с."],
    [PartsOfSpeech.ADVERB_OD]:      ["наречие образа действия", "наречий образа действия", "нар. об. д.", "нар о.д."],
    [PartsOfSpeech.ADVERB_OTR]:     ["наречие отрицательное", "наречий отрицательных", "нар. отр.", "нар. о."],
    [PartsOfSpeech.ADVERB_PR]:      ["наречие причины", "наречий причины", "нар. прич.", "нар. п."],
    [PartsOfSpeech.ADVERB_UK]:      ["наречие указательное", "наречий указательных", "нар. указ.", "нар. у."],
    [PartsOfSpeech.ADVERB_VR]:      ["наречие времени", "наречий времени", "нар. врем.", "нар. в."],
    [PartsOfSpeech.CATEGORYS]:      ["категория состояния", "категорий состояния", "катег. сост.", "кат. с."],
    [PartsOfSpeech.GERUND_NSV]:     ["депричастие несовершенного вида", "деепричастий несовершенного вида", "деепр. н.в.", "дееп. н. в."],
    [PartsOfSpeech.GERUNDS]:        ["депричастие", "деепричастий", "дееприч.", "деепр."],
    [PartsOfSpeech.GERUND_SV]:      ["депричастие совершенного вида", "депричастий совершенного вида", "деепр. с.в.", "дееп. с. в."],
    [PartsOfSpeech.ONOMATOPOEIAS]:  ["звукоподражание", "звукоподражаний", "зв/подр.", "зв/подр."],
    [PartsOfSpeech.PARTICIPLE_D]:   ["причастие действительное", "причастий действительных", "прич. д.", "прич. д."],
    [PartsOfSpeech.PARTICIPLE_S]:   ["причастие страдательное", "причастий страдательных", "прич. стр.", "прич. с."],
    [PartsOfSpeech.PARTICIPLES]:    ["причастие", "причастий", "причаст.", "прич."],
    [PartsOfSpeech.PARTICLE_F]:     ["частица формообразующая", "частиц формообразующих", "част. форм.", "част. ф."],
    [PartsOfSpeech.PARTICLE_MOD]:   ["частица модальная", "частиц модальных", "част. мод.", "част. м."],
    [PartsOfSpeech.PARTICLE_OTR]:   ["частица отрицательная", "частиц отрицательных", "част. отр.", "част. о."],
    [PartsOfSpeech.PREPOSITION_NP]: ["предлог непроизводный", "предлогов непроизводных", "предл. непр.", "предл. н."],
    [PartsOfSpeech.PREPOSITION_PR]: ["предлог производный", "предлогов производных", "предл. пр.", "предл. п."],
    [PartsOfSpeech.UNION_P]:        ["союз подчинительный", "союзов подчинительных", "союз подч.", "союз п."],
    [PartsOfSpeech.UNION_S]:        ["союз сочинительный", "союзов сочинительных", "союз соч.", "союз с."],
    [PartsOfSpeech.UNIONS]:         ["союз", "союзов", "союз", "союз"],
    /*[PartsOfSpeech.ADJECTIVES_KR]:  ["", "", "", ""],
    [PartsOfSpeech.ADJECTIVES_PL]:  ["", "", "", ""],
    [PartsOfSpeech.NOUNS_1]:        ["", "", "", ""],
    [PartsOfSpeech.NOUNS_2]:        ["", "", "", ""],
    [PartsOfSpeech.NOUNS_3]:        ["", "", "", ""],
    [PartsOfSpeech.VERBS_BVR]:      ["", "", "", ""],
    [PartsOfSpeech.VERBS_NVR]:      ["", "", "", ""],
    [PartsOfSpeech.VERBS_PVR]:      ["", "", "", ""], 
    [PartsOfSpeech.NOUNS_1_PP]:     ["", "", "", ""],
    [PartsOfSpeech.NOUNS_1_RP]:     ["", "", "", ""],
    [PartsOfSpeech.NOUNS_2_DP]:     ["", "", "", ""],
    [PartsOfSpeech.NOUNS_2_PP]:     ["", "", "", ""],
    [PartsOfSpeech.NOUNS_2_RP]:     ["", "", "", ""],
    [PartsOfSpeech.NOUNS_3_RP]:     ["", "", "", ""],
    [PartsOfSpeech.NOUNS_TE]:       ["", "", "", ""],
    [PartsOfSpeech.NOUNS_TM]:       ["", "", "", ""],
    [PartsOfSpeech.VERBS_1_LE]:     ["", "", "", ""],
    [PartsOfSpeech.VERBS_1_LM]:     ["", "", "", ""],
    [PartsOfSpeech.VERBS_1_LM]:     ["", "", "", ""],
    [PartsOfSpeech.VERBS_2_LE]:     ["", "", "", ""],
    [PartsOfSpeech.VERBS_2_LM]:     ["", "", "", ""],
    [PartsOfSpeech.VERBS_3_LE]:     ["", "", "", ""],
    [PartsOfSpeech.VERBS_3_LM]:     ["", "", "", ""],
    [PartsOfSpeech.ADJECTIVES_KA]:  ["", "", "", ""],
    [PartsOfSpeech.ADJECTIVES_OT]:  ["", "", "", ""],
    [PartsOfSpeech.ADJECTIVES_PPS]: ["", "", "", ""],
    [PartsOfSpeech.ADJECTIVES_PR]:  ["", "", "", ""],
    [PartsOfSpeech.ADJECTIVES_PSS]: ["", "", "", ""],
    [PartsOfSpeech.ADJECTIVES_SPS]: ["", "", "", ""],
    [PartsOfSpeech.ADJECTIVES_SSS]: ["", "", "", ""],
    [PartsOfSpeech.NOUNS_NS]:       ["", "", "", ""],
    [PartsOfSpeech.NOUNS_OR]:       ["", "", "", ""],
    [PartsOfSpeech.NOUNS_RS]:       ["", "", "", ""],
    [PartsOfSpeech.NUMERALS_DR]:    ["", "", "", ""],
    [PartsOfSpeech.NUMERALS_KO]:    ["", "", "", ""],
    [PartsOfSpeech.NUMERALS_PO]:    ["", "", "", ""],
    [PartsOfSpeech.NUMERALS_SO]:    ["", "", "", ""],
    [PartsOfSpeech.VERBS_IN]:       ["", "", "", ""],
    [PartsOfSpeech.VERBS_RS]:       ["", "", "", ""],
    [PartsOfSpeech.VERBS_VZ]:       ["", "", "", ""],
    [PartsOfSpeech.PRONOUNS_NE]:    ["", "", "", ""],
    [PartsOfSpeech.PRONOUNS_OPR]:   ["", "", "", ""],
    [PartsOfSpeech.PRONOUNS_OTN]:   ["", "", "", ""],
    [PartsOfSpeech.PRONOUNS_OTR]:   ["", "", "", ""],
    [PartsOfSpeech.PRONOUNS_PR]:    ["", "", "", ""],
    [PartsOfSpeech.PRONOUNS_UK]:    ["", "", "", ""],
    [PartsOfSpeech.PRONOUNS_VO]:    ["", "", "", ""],
    [PartsOfSpeech.PRONOUNS_VZ]:    ["", "", "", ""],
    [PartsOfSpeech.VERBS_BL]:       ["", "", "", ""],
    [PartsOfSpeech.VERBS_NE]:       ["", "", "", ""],
    [PartsOfSpeech.VERBS_PE]:       ["", "", "", ""],
    [PartsOfSpeech.VERBS_PN]:       ["", "", "", ""],
    [PartsOfSpeech.VERBS_UN]:       ["", "", "", ""],*/
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
