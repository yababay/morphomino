import { PartsOfSpeech } from "./types"

enum Levels {
    CLASS_5_1,
    CLASS_5_2,
    CLASS_5_3,
    CLASS_6_1,
    CLASS_6_2,
    CLASS_7_1,
    CLASS_7_2,
    COMMON,
    UNDEFINED
}

const LevelDescriptions = {
    [Levels.UNDEFINED]: {
        description: 'Выберите уровень:',
        items: []
    },   
    [Levels.CLASS_5_1]: {
            description: '5 класс, уровень 1',
            items: [
            PartsOfSpeech.ADJECTIVES,
            PartsOfSpeech.ADVERBS,
            PartsOfSpeech.NOUNS,
            PartsOfSpeech.NUMERALS,
            PartsOfSpeech.PARTICLES,
            PartsOfSpeech.PREPOSITIONS,
            PartsOfSpeech.PRONOUNS,
            PartsOfSpeech.UNIONS,
            PartsOfSpeech.VERBS
        ]
    },
    [Levels.CLASS_5_2]: {
        description: '5 класс, уровень 2',
        items: [
            PartsOfSpeech.ADJECTIVES_KR,
            PartsOfSpeech.ADJECTIVES_PL,
            PartsOfSpeech.ADVERBS,
            PartsOfSpeech.NOUNS_1,
            PartsOfSpeech.NOUNS_2,
            PartsOfSpeech.NOUNS_3,
            PartsOfSpeech.VERBS_BVR,
            PartsOfSpeech.VERBS_NVR,
            PartsOfSpeech.VERBS_PVR        ]
    },
    [Levels.CLASS_5_3]: {
        description: '5 класс, уровень 3',
        items: [
            PartsOfSpeech.ADVERBS,
            PartsOfSpeech.NOUNS_TE,
            PartsOfSpeech.NOUNS_TM,
            PartsOfSpeech.NOUNS_1_PP,
            PartsOfSpeech.NOUNS_1_RP,
            PartsOfSpeech.NOUNS_2_DP,
            PartsOfSpeech.NOUNS_2_PP,
            PartsOfSpeech.NOUNS_2_RP,
            PartsOfSpeech.NOUNS_3_RP,
            PartsOfSpeech.VERBS_1_LE,
            PartsOfSpeech.VERBS_1_LM,
            PartsOfSpeech.VERBS_2_LE,
            PartsOfSpeech.VERBS_2_LM,
            PartsOfSpeech.VERBS_3_LE,
            PartsOfSpeech.VERBS_3_LM      ]
    },        
    [Levels.CLASS_6_1]: {
        description: '6 класс, уровень 1',
        items: [
            PartsOfSpeech.ADJECTIVES_KA,
            PartsOfSpeech.ADJECTIVES_OT,
            PartsOfSpeech.ADJECTIVES_PPS,
            PartsOfSpeech.ADJECTIVES_PR,
            PartsOfSpeech.ADJECTIVES_PSS,
            PartsOfSpeech.ADJECTIVES_SPS,
            PartsOfSpeech.ADJECTIVES_SSS,
            PartsOfSpeech.NOUNS_NS,
            PartsOfSpeech.NOUNS_OR,
            PartsOfSpeech.NOUNS_RS,
            PartsOfSpeech.NUMERALS_DR,
            PartsOfSpeech.NUMERALS_KO,
            PartsOfSpeech.NUMERALS_PO,
            PartsOfSpeech.NUMERALS_SO,
            PartsOfSpeech.VERBS_IN,
            PartsOfSpeech.VERBS_RS,
            PartsOfSpeech.VERBS_VZ        ]
    },        
    [Levels.CLASS_6_2]: {
        description: '6 класс, уровень 2',
        items: [
            PartsOfSpeech.PRONOUNS_LI,
            PartsOfSpeech.PRONOUNS_NE,
            PartsOfSpeech.PRONOUNS_OPR,
            PartsOfSpeech.PRONOUNS_OTN,
            PartsOfSpeech.PRONOUNS_OTR,
            PartsOfSpeech.PRONOUNS_PR,
            PartsOfSpeech.PRONOUNS_UK,
            PartsOfSpeech.PRONOUNS_VO,
            PartsOfSpeech.PRONOUNS_VZ,
            PartsOfSpeech.VERBS_BL,
            PartsOfSpeech.VERBS_NE,
            PartsOfSpeech.VERBS_PE,
            PartsOfSpeech.VERBS_PN,
            PartsOfSpeech.VERBS_UN
        ]
    },        
    [Levels.CLASS_7_1]: {
        description: '7 класс, уровень 1',
        items: [
            PartsOfSpeech.ADJECTIVES,
            PartsOfSpeech.ADVERBS,
            PartsOfSpeech.CATEGORYS,
            PartsOfSpeech.GERUNDS,
            PartsOfSpeech.INTERJECTIONS,
            PartsOfSpeech.NOUNS,
            PartsOfSpeech.NUMERALS,
            PartsOfSpeech.ONOMATOPOEIAS,
            PartsOfSpeech.PARTICIPLES,
            PartsOfSpeech.PARTICLES,
            PartsOfSpeech.PREPOSITIONS,
            PartsOfSpeech.PRONOUNS,
            PartsOfSpeech.UNIONS,
            PartsOfSpeech.VERBS
        ]
    },

    [Levels.CLASS_7_2]: {
        description: '7 класс, уровень 2',
        items: [
            PartsOfSpeech.ADVERB_CE,
            PartsOfSpeech.ADVERB_ME,
            PartsOfSpeech.ADVERB_MS,
            PartsOfSpeech.ADVERB_OD,
            PartsOfSpeech.ADVERB_OTR,
            PartsOfSpeech.ADVERB_PR,
            PartsOfSpeech.ADVERB_UK,
            PartsOfSpeech.ADVERB_VR,
            PartsOfSpeech.GERUND_NSV,
            PartsOfSpeech.GERUND_SV,
            PartsOfSpeech.PARTICIPLE_D,
            PartsOfSpeech.PARTICIPLE_S,
            PartsOfSpeech.PARTICLE_F,
            PartsOfSpeech.PARTICLE_MOD,
            PartsOfSpeech.PARTICLE_OTR,
            PartsOfSpeech.PREPOSITION_NP,
            PartsOfSpeech.PREPOSITION_PR,
            PartsOfSpeech.UNION_P,
            PartsOfSpeech.UNION_S
        ]
    },
    [Levels.COMMON]: {
        description: 'Общая лексика',
        items: [
            PartsOfSpeech.ADJECTIVES,
            PartsOfSpeech.ADVERBS,
            PartsOfSpeech.CONJUNCTIONS,
            PartsOfSpeech.INTERJECTIONS,
            PartsOfSpeech.NOUNS,
            PartsOfSpeech.NUMERALS,
            PartsOfSpeech.PARTICLES,
            PartsOfSpeech.PREPOSITIONS,
            PartsOfSpeech.PRONOUNS,
            PartsOfSpeech.VERBS
        ]
    }
}

class Level {

    #key: string
    #value: Level
    #items: PartsOfSpeech[]
    #description: string

    constructor(level: Levels | string ){
        const strongLevel = typeof level === 'string' ? Levels[level] : level
        const {items, description} = LevelDescriptions[strongLevel]
        this.#value = strongLevel
        this.#key = Levels[strongLevel]
        this.#description = description
        this.#items = items
    }

    get key(){return this.#key}
    get value(){return this.#value}
    get items(){return this.#items}
    get description(){return this.#description}
    get path(){
        return `./linguo/${this.#key.replace('CLASS_', 'level-').toLowerCase()}`
    }
    get fileNames(){
        const {path} = this
        return this.items.map(pos => ({pos, path: `${path}/${PartsOfSpeech[pos].toLowerCase()}.txt`}))
    }

    static getDescriptions(withoutUndefined: boolean = true): string[] {
        return Level.getKeyNames(withoutUndefined)
            .map($=> new Level($).description)
    }

    static getKeyNames(withUndefined: boolean = false): string[] {
        return Object.keys(Levels)
            .filter($ => isNaN(Number($)))
            .filter($ => withUndefined || $ !== 'UNDEFINED')
    }

    static getKeysWithLabels(){
        return Level.getKeyNames().map($=> new Level($)).map(({key, description})=> ({key, label: description}))
    }
}

export { Levels, Level }
