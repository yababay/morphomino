import { GameStages } from '../../types'
import { stage, ignoreInstruction, instructionTimeout, dealTimeout } from '../../store'
import { delayedAction } from '../../util'

export async function startGame(){
    await delayedAction(5000)
    if(!ignoreInstruction){
        stage.set(GameStages.INSTRUCTION)
        await delayedAction(instructionTimeout)
    }
    stage.set(GameStages.DEAL)
    await delayedAction(dealTimeout)
    stage.set(GameStages.FLOW)
}
