import { PartsOfSpeech, MoveStatuses, GamerRoles, GameStages } from './types'
import { Levels, Level } from './levels'
import PartOfSpeech from './pos'
import MorminoItem from './mormino'

function getStageDescription(stage: GameStages): string{
    switch(stage){
        case GameStages.BREAK: return "Игра прервана."
        case GameStages.DEAD_HEAT: return "Игра закончилась вничью."
        case GameStages.HOST_IS_WON: return "В игре победил пригласивший."
        case GameStages.GUEST_IS_WON: return "В игре победил приглашенный"
        case GameStages.FULFILLED: return "Все карточки успешно отгаданы."
        case GameStages.TIMEOUT: return "Время игры закончилось."
        default: return "Игра закончилась по неизвестной причине."
    }
}
export { PartsOfSpeech, PartOfSpeech, MoveStatuses, GamerRoles, 
    GameStages, MorminoItem, Levels, Level, getStageDescription }
