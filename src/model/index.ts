import { PartsOfSpeech, MoveStatuses, GamerRoles, GameStages, WordWithPos } from './types'
import PartOfSpeech from './pos'
import MorminoItem from './mormino'

interface Move {
    role: GamerRoles
    card: MorminoItem    
}

export { PartsOfSpeech, PartOfSpeech, MoveStatuses, GamerRoles, GameStages, MorminoItem }
export type { WordWithPos, Move }
