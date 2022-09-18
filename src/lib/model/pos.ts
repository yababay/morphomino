/* Parts of speech */

import { PartsOfSpeech, PosDescription } from "./types"

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

function getPosDescription(_pos: PartsOfSpeech | string): PosDescription{
    let pos: PartsOfSpeech = typeof _pos !== 'string' && _pos || PartsOfSpeech[_pos]
    const descr = descriptions[pos]
    if(!descr) throw 'Не удалось определить характеристики части речи.'
    const [nominative, genetive, shortName, shortestName] = descr
    return {pos, nominative, genetive, shortName, shortestName}
}

export default null
