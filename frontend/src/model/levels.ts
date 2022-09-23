import { PartsOfSpeech } from "./types"

enum Levels {
    COMMON,
    CLASS_7_1,
    CLASS_7_2
}

const PosByLevel = {
    [Levels.CLASS_7_1]: [
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
    ],

    [Levels.CLASS_7_2]: [
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
    ],
    [Levels.COMMON]: [
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

export { PosByLevel, Levels }
