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

enum GameStages {
    INSTRUCTION,
    SETUP,
    FLOW,
    BREAK,
    END,
    HOST_IS_WON,
    GUEST_IS_WON,
    DEAD_HEAT,
    FULFILLED,
    TIMEOUT
}

enum MoveStatuses {
    UNDEFINED,
    FORTHCOMING,
    HOST_IS_WON,
    GUEST_IS_WON,
    HOST_IS_WRONG,
    GUEST_IS_WRONG,
    BOTH_ARE_FAILED
}

enum GamerRoles {
    HOST,
    GUEST,
    ROBOT
}

export { PartsOfSpeech, MoveStatuses, GamerRoles, GameStages }

