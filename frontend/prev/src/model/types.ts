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
    ADJECTIVES_KR,
    ADJECTIVES_PL,
    NOUNS_1,
    NOUNS_2,
    NOUNS_3,
    VERBS_BVR,
    VERBS_NVR,
    VERBS_PVR, 
    NOUNS_1_PP,
    NOUNS_1_RP,
    NOUNS_2_DP,
    NOUNS_2_PP,
    NOUNS_2_RP,
    NOUNS_3_RP,
    NOUNS_TE,
    NOUNS_TM,
    VERBS_1_LE,
    VERBS_1_LM,
    VERBS_2_LE,
    VERBS_2_LM,
    VERBS_3_LE,
    VERBS_3_LM,
    ADJECTIVES_KA,
    ADJECTIVES_OT,
    ADJECTIVES_PPS,
    ADJECTIVES_PR,
    ADJECTIVES_PSS,
    ADJECTIVES_SPS,
    ADJECTIVES_SSS,
    NOUNS_NS,
    NOUNS_OR,
    NOUNS_RS,
    NUMERALS_DR,
    NUMERALS_KO,
    NUMERALS_PO,
    NUMERALS_SO,
    VERBS_IN,
    VERBS_RS,
    VERBS_VZ,
    PRONOUNS_LI,
    PRONOUNS_NE,
    PRONOUNS_OPR,
    PRONOUNS_OTN,
    PRONOUNS_OTR,
    PRONOUNS_PR,
    PRONOUNS_UK,
    PRONOUNS_VO,
    PRONOUNS_VZ,
    VERBS_BL,
    VERBS_NE,
    VERBS_PE,
    VERBS_PN,
    VERBS_UN,
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
