/* No imports here, please! */

export async function delayedAction(delay: number, func: CallableFunction = () => { }) {
    return new Promise((yep) => setTimeout(() => yep(func()), delay))
}

export function getGameTime(elapsed: number, shorten: boolean = false){
    const [minutes, seconds, minUnitCase, secUnitCase] = getTimeWithUnits(elapsed, shorten)
    const mins = minutes > 0 ? `${minutes} ${minUnitCase} ` : ''
    const secs = seconds > 0 ? `${seconds} ${secUnitCase}`  : ''
    return `${mins}${secs}`
}

export function setSvelteComponent(Component: any, id: string | Element, props: object = {}): void{
    getSvelteComponent(Component, id, props)
}

export function getSvelteComponent(Component: any, target: string | Element, props: object = {}): any{
    if(typeof target === 'string') target = assureElement(target)
    return Reflect.construct(Component, [{target, props}])
}

export function assureElement(element: string | Element): Element {
    return typeof element === 'string' ? document.getElementById(element) : element
}

export function getRandomIndex(arr: any[]){
    if(!arr) throw 'Данные о статистике частей речи еще не загружены.'
    return Math.floor(Math.random() * arr.length)
}

export function getTimeWithUnits(seconds: number, abbreviated: boolean = false): any[] {
    const minutes = Math.floor(seconds / 60)
    seconds = seconds - minutes * 60
    const minRest = minutes % 20
    const secRest = seconds % 20
    let minUnitCase: string, secUnitCase: string
    switch(secRest){
        case 1: 
            secUnitCase = 'секунду'
            break
        case 2: 
        case 3: 
        case 4: 
            secUnitCase = 'секунды'
            break 
        default: 
            secUnitCase = 'секунд' 
    }
    switch(minRest){
        case 1: 
            minUnitCase = 'минуту'
            break
        case 2: 
        case 3: 
        case 4: 
            minUnitCase = 'минуты'
            break 
        default: 
            minUnitCase = 'минут'
    }
    if(abbreviated){
        minUnitCase = 'мин.'
        secUnitCase = 'сек.'
    }
    return [minutes, seconds, minUnitCase, secUnitCase]
}
