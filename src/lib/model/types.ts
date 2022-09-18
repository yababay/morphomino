enum PartsOfSpeech {
    NOUN,
    PRONOUN,
    VERB,
    ADJECTIVE,
    ADVERB,
    PREPOSITION,
    CONJUNCTION,
    INTERJECTION,
    NUMERAL,
    PARTICLE,
    UNDEFINED
}

interface WordWithPos {
    word: string
    pos: PartsOfSpeech
}

interface PosDescription {
    pos: PartsOfSpeech
    nominative: string
    genetive: string
    shortName: string
    shortestName: string
}

export { PartsOfSpeech }
export type { WordWithPos, PosDescription }
