/* No imports here, please! */

function setSvelteComponent(Component: any, id: string | Element, props: object = {}): void{
    getSvelteComponent(Component, id, props)
}

function getSvelteComponent(Component: any, target: string | Element, props: object = {}): any{
    if(typeof target === 'string') target = assureElement(target)
    return Reflect.construct(Component, [{target, props}])
}

function assureElement(element: string | Element): Element {
    return typeof element === 'string' ? document.getElementById(element) : element
}

async function delayedAction (delay: number, func: CallableFunction = () => {}){
    return new Promise((yep) => setTimeout(() => yep(func()), delay))
}

function getRandomIndex(arr: any[]){
    if(!arr) throw 'Данные о статистике частей речи еще не загружены.'
    return Math.floor(Math.random() * arr.length)
}

function getTimeWithUnits(seconds: number, abbreviated: boolean = false): any[] {
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

export { delayedAction, setSvelteComponent, assureElement, getRandomIndex, getTimeWithUnits }

/*


function getMainSections(): Element[]{
    return Array.from(document.querySelectorAll('main > section'))
}

function saveObject(key: string, value: object, writable = null){
    const str = JSON.stringify(value)
    localStorage.setItem(key, str)
    if(writable) writable.set(str)
}


function toStorage(event, key: string, writable = null): void{
    let {target} = event
    let {value} = target
    if(target.type === 'checkbox') value = target.checked
    else if(!isNaN(value)) value = parseInt(value)
    localStorage.setItem(key, value)
    if(writable) writable.set(value)
}

function stringFromStorage(key: string, byDefault: string) : string {
    const error = new Error('Не удалось распознать строковое значение в хранилище или настройках.')
    const value = fromStorage(key, byDefault)
    if(typeof value === 'number' || typeof value === 'boolean') throw error
    return  value
}

function booleanFromStorage(key: string, byDefault: boolean) : boolean {
    const error = new Error('Не удалось распознать логическое значение в хранилище или настройках.')
    const value = fromStorage(key, byDefault)
    if(typeof value === 'boolean') return value
    if(typeof value === 'number' || !['true', 'false'].includes(value)) throw error
    return  value === 'true'
}

function numberFromStorage(key: string, byDefault: number) : number {
    const error = new Error('Не удалось распознать число в хранилище или настройках.')
    let value = fromStorage(key, byDefault)
    if(typeof value === 'number') return value
    if(typeof value === 'boolean') throw error
    value = parseFloat(value)
    if(isNaN(value)) throw error
    return value
}

function fromStorage(key: string, byDefault: string | number | boolean): string | number | boolean{
    let value: string | number | boolean | object = localStorage.getItem(key)
    if(!['string', 'number', 'boolean'].includes(typeof value)){
        localStorage.setItem(key, `${byDefault}`)
        value = byDefault
    }
    return value
}

export { getTimeWithUnits, toStorage, numberFromStorage, 
    booleanFromStorage, stringFromStorage, fromStorage, getRandomIndex,
    delayedAction, setSvelteComponent, getSvelteComponent, saveObject,
    getMainSections, assureElement 
}
*/