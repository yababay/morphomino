import { writable, get, derived } from 'svelte/store'
import { GamerRoles, MoveStatuses } from '../model'

const moves = writable([])
const flow = writable([])
const role = writable()
const scores = derived(moves, $moves => {
    const scores = $moves.filter(el => 
        get(role) === GamerRoles.HOST && el === MoveStatuses.HOST_IS_WON 
        || 
        get(role) === GamerRoles.GUEST && el === MoveStatuses.GUEST_IS_WON 
        ).length
    return `${scores}/${$moves.length}`
})

export { moves, flow, role, scores }