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

enum GameStages {
    INSTRUCTION,
    SETUP,
    FLOW,
    BREAK,
    HOST_IS_WON,
    GUEST_IS_WON,
    DEAD_HEAT,
    TIMEOUT
}

enum MoveStatuses {
    FORTHCOMING,
    HOST_IS_WON,
    GUEST_IS_WON,
    BOTH_ARE_FAILED
}

enum GamerRoles {
    HOST,
    GUEST
}

export { PartsOfSpeech, MoveStatuses, GamerRoles, GameStages }
export type { WordWithPos }
