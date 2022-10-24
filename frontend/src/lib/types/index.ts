import { PartsOfSpeech, MoveStatuses, GamerRoles, GameStages } from './types'
import { Levels, Level } from './levels'
import PartOfSpeech from './pos'
import MorminoItem from './mormino'

export function getStageDescription(stage: GameStages): string{
    switch(stage){
        case GameStages.LOADING: return "Игра загружается."
        case GameStages.BROKEN: return "Игра прервана."
        case GameStages.DEAD_HEAT: return "Игра закончилась вничью."
        case GameStages.HOST_IS_WON: return "В игре победил пригласивший."
        case GameStages.GUEST_IS_WON: return "В игре победил приглашенный"
        case GameStages.FULFILLED: return "Все карточки успешно отгаданы."
        case GameStages.TIMEOUT: return "Время игры закончилось."
        default: return "Игра закончилась по неизвестной причине."
    }
}

export const endings = [GameStages.BROKEN, GameStages.FULFILLED, GameStages.TIMEOUT]

export function gameOver(stage: GameStages){
    return endings.includes(stage)
}

export { PartsOfSpeech, PartOfSpeech, MoveStatuses, GamerRoles, 
    GameStages, MorminoItem, Levels, Level 
}
