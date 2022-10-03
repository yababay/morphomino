/* Match ids with proxies here, and nothing more! */

import Game       from './game/Game.svelte'
import Intro      from './intro/Intro.svelte'
import Loader     from './loader/Loader.svelte'
import Settings   from './settings/Settings.svelte'
import Statistics from './statistics/Statistics.svelte'

export default {
    game: Game,
    intro: Intro,
    loader: Loader,
    settings: Settings,
    statistics: Statistics
}
