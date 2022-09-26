import { PartsOfSpeech } from "./types"

enum Levels {
    COMMON,
    CLASS_7_1,
    CLASS_7_2,
    UNDEFINED
}

const LevelDescriptions = {
    [Levels.UNDEFINED]: {
        description: 'Выберите уровень',
        items: []
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

    static getDescriptions(withoutUndefined: boolean = true): string[] {
        return Level.getKeyNames(withoutUndefined)
            .map($=> new Level($).description)
    }

    static getKeyNames(withoutUndefined: boolean = true): string[] {
        return Object.keys(Levels)
            .filter($ => isNaN(Number($)))
            .filter($ => withoutUndefined && $ !== 'UNDEFINED' || false)
    }

    static getKeysWithLabels(){
        return Level.getKeyNames().map($=> new Level($)).map($=> ({key: $.key, label: $.description}))
    }

}

export { Levels, Level }
