import { get, derived, writable } from "svelte/store"
import { level } from '../components/sections/settings'
import { getGameTime } from '../util'
import { GamerRoles, MoveStatuses, Level, GameStages } from '../types'

export const alert    = writable('')
export const elapsed  = writable(0)
export const progress = writable(0)
export const role     = writable(GamerRoles.HOST)
export const stage    = writable(GameStages.UNDEFINED)
export const flow     = writable([])
export const deal     = writable([])
export const moves    = writable([])

export const elapsedWithUnits = derived(elapsed, $elapsed => getGameTime($elapsed, true))

export const levelDescription = derived(level, ($level: string) => new Level(`CLASS_${$level}`).description)

export const scores = derived(moves, $moves => {
    const scores = $moves.filter(el => 
        get(role) === GamerRoles.HOST && el === MoveStatuses.HOST_IS_WON 
        || 
        get(role) === GamerRoles.GUEST && el === MoveStatuses.GUEST_IS_WON 
        ).length
    return [scores, $moves.length]
})

export const reversed = derived(moves, $moves => {
    const future = $moves.filter(el => el === MoveStatuses.FORTHCOMING)
    const past = $moves.filter(el => el !== MoveStatuses.FORTHCOMING).reverse()
    return [...past, ...future]
})

export const scoresSlashed = derived(scores, ([won, all]) => `${won}/${all}`);
export const scoresVerbose = derived(scores, ([won, all]) => `${won} заданий из ${all}`)
export const isFullfilled = derived(moves, $moves => $moves.length > 0 && $moves.filter($=> $ !== MoveStatuses.FORTHCOMING).length === $moves.length)

export const levelClass = derived(level, $level => typeof $level === 'string' && $level.split('_')[0])
export const levelNumber = derived(level, $level => typeof $level === 'string' && $level.split('_')[1])

//export const isGame = derived(hashWithParams, $hash => {
//    const value = typeof $hash !== 'string' && Reflect.get($hash, 'hash') || $hash
//    return value === '#game' 
//})
