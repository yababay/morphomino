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
    [PartsOfSpeech.ADJECTIVES_KR]:  ["1", "1", "1", "1"],
    [PartsOfSpeech.ADJECTIVES_PL]:  ["1", "1", "1", "1"],
    [PartsOfSpeech.NOUNS_1]:        ["1", "1", "1", "1"],
    [PartsOfSpeech.NOUNS_2]:        ["1", "1", "1", "1"],
    [PartsOfSpeech.NOUNS_3]:        ["1", "1", "1", "1"],
    [PartsOfSpeech.VERBS_BVR]:      ["1", "1", "1", "1"],
    [PartsOfSpeech.VERBS_NVR]:      ["1", "1", "1", "1"],
    [PartsOfSpeech.VERBS_PVR]:      ["1", "1", "1", "1"], 
    [PartsOfSpeech.NOUNS_1_PP]:     ["1", "1", "1", "1"],
    [PartsOfSpeech.NOUNS_1_RP]:     ["1", "1", "1", "1"],
    [PartsOfSpeech.NOUNS_2_DP]:     ["1", "1", "1", "1"],
    [PartsOfSpeech.NOUNS_2_PP]:     ["1", "1", "1", "1"],
    [PartsOfSpeech.NOUNS_2_RP]:     ["1", "1", "1", "1"],
    [PartsOfSpeech.NOUNS_3_RP]:     ["1", "1", "1", "1"],
    [PartsOfSpeech.NOUNS_TE]:       ["1", "1", "1", "1"],
    [PartsOfSpeech.NOUNS_TM]:       ["1", "1", "1", "1"],
    [PartsOfSpeech.VERBS_1_LE]:     ["1", "1", "1", "1"],
    [PartsOfSpeech.VERBS_1_LM]:     ["1", "1", "1", "1"],
    [PartsOfSpeech.VERBS_1_LM]:     ["1", "1", "1", "1"],
    [PartsOfSpeech.VERBS_2_LE]:     ["1", "1", "1", "1"],
    [PartsOfSpeech.VERBS_2_LM]:     ["1", "1", "1", "1"],
    [PartsOfSpeech.VERBS_3_LE]:     ["1", "1", "1", "1"],
    [PartsOfSpeech.VERBS_3_LM]:     ["1", "1", "1", "1"],
    [PartsOfSpeech.ADJECTIVES_KA]:  ["1", "1", "1", "1"],
    [PartsOfSpeech.ADJECTIVES_OT]:  ["1", "1", "1", "1"],
    [PartsOfSpeech.ADJECTIVES_PPS]: ["1", "1", "1", "1"],
    [PartsOfSpeech.ADJECTIVES_PR]:  ["1", "1", "1", "1"],
    [PartsOfSpeech.ADJECTIVES_PSS]: ["1", "1", "1", "1"],
    [PartsOfSpeech.ADJECTIVES_SPS]: ["1", "1", "1", "1"],
    [PartsOfSpeech.ADJECTIVES_SSS]: ["1", "1", "1", "1"],
    [PartsOfSpeech.NOUNS_NS]:       ["1", "1", "1", "1"],
    [PartsOfSpeech.NOUNS_OR]:       ["1", "1", "1", "1"],
    [PartsOfSpeech.NOUNS_RS]:       ["1", "1", "1", "1"],
    [PartsOfSpeech.NUMERALS_DR]:    ["1", "1", "1", "1"],
    [PartsOfSpeech.NUMERALS_KO]:    ["1", "1", "1", "1"],
    [PartsOfSpeech.NUMERALS_PO]:    ["1", "1", "1", "1"],
    [PartsOfSpeech.NUMERALS_SO]:    ["1", "1", "1", "1"],
    [PartsOfSpeech.VERBS_IN]:       ["1", "1", "1", "1"],
    [PartsOfSpeech.VERBS_RS]:       ["1", "1", "1", "1"],
    [PartsOfSpeech.VERBS_VZ]:       ["1", "1", "1", "1"],
    [PartsOfSpeech.PRONOUNS_NE]:    ["1", "1", "1", "1"],
    [PartsOfSpeech.PRONOUNS_OPR]:   ["1", "1", "1", "1"],
    [PartsOfSpeech.PRONOUNS_OTN]:   ["1", "1", "1", "1"],
    [PartsOfSpeech.PRONOUNS_OTR]:   ["1", "1", "1", "1"],
    [PartsOfSpeech.PRONOUNS_PR]:    ["1", "1", "1", "1"],
    [PartsOfSpeech.PRONOUNS_UK]:    ["1", "1", "1", "1"],
    [PartsOfSpeech.PRONOUNS_VO]:    ["1", "1", "1", "1"],
    [PartsOfSpeech.PRONOUNS_VZ]:    ["1", "1", "1", "1"],
    [PartsOfSpeech.VERBS_BL]:       ["1", "1", "1", "1"],
    [PartsOfSpeech.VERBS_NE]:       ["1", "1", "1", "1"],
    [PartsOfSpeech.VERBS_PE]:       ["1", "1", "1", "1"],
    [PartsOfSpeech.VERBS_PN]:       ["1", "1", "1", "1"],
    [PartsOfSpeech.VERBS_UN]:       ["1", "1", "1", "1"],
    [PartsOfSpeech.PRONOUNS_LI]:       ["1", "1", "1", "1"],
    [PartsOfSpeech.UNDEFINED]:      ["1", "1", "1", "1"]
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
