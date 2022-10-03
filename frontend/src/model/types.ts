enum PartsOfSpeech {
    ADJECTIVES,
    ADVERB_CE,
    ADVERB_ME,
    ADVERB_MS,
    ADVERB_OD,
    ADVERB_OTR,
    ADVERB_PR,
    ADVERBS,
    ADVERB_UK,
    ADVERB_VR,
    CATEGORYS,
    CONJUNCTIONS,
    GERUND_NSV,
    GERUNDS,
    GERUND_SV,
    INTERJECTIONS,
    NOUNS,
    NUMERALS,
    ONOMATOPOEIAS,
    PARTICIPLE_D,
    PARTICIPLE_S,
    PARTICIPLES,
    PARTICLE_F,
    PARTICLE_MOD,
    PARTICLE_OTR,
    PARTICLES,
    PREPOSITION_NP,
    PREPOSITION_PR,
    PREPOSITIONS,
    PRONOUNS,
    UNION_P,
    UNION_S,
    UNIONS,
    VERBS,
    UNDEFINED
}

enum GameStages {
    INSTRUCTION,
    DEAL,
    FLOW,
    BREAK,
    END,
    HOST_IS_WON,
    GUEST_IS_WON,
    DEAD_HEAT,
    FULFILLED,
    TIMEOUT,
    UNDEFINED
}

enum MoveStatuses {
    UNDEFINED,
    FORTHCOMING,
    HOST_IS_WON,
    GUEST_IS_WON,
    HOST_IS_WRONG,
    GUEST_IS_WRONG,
    BOTH_ARE_FAILED,
    ROBOT_IS_WON,
    SELF_IS_WON
}

enum GamerRoles {
    HOST,
    GUEST,
    ROBOT
}

interface ShowHide {
    onShow: CallableFunction
    onHide: CallableFunction
}

interface SectionWithEffects {
    section: Element
    effects: ShowHide
}

export { PartsOfSpeech, MoveStatuses, GamerRoles, GameStages }
export type { SectionWithEffects, ShowHide }
