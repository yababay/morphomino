function delayedAction (func: CallableFunction, delay: number){
    return new Promise((yep) => setTimeout(() => yep(func()), delay))
}

function getRandomIndex(arr: any[]){
    if(!arr) throw 'Данные о статистике частей речи еще не загружены.'
    return Math.floor(Math.random() * arr.length)
}

function toStorage(event, key: string, writable = null): void{
    let {target} = event
    let {value} = target
    if(target.type === 'checkbox') value = target.checked
    else if(!isNaN(value)) value = parseInt(value)
    localStorage.setItem(key, value)
    if(writable) writable.set(value)
}

function stringFromStorage(key: string, byDefault: number) : string {
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
    return localStorage.getItem(key) || byDefault
}

function getTimeWithUnits(seconds: number): object {
    const minutes = Math.floor(seconds / 60)
    seconds = seconds - minutes * 60
    const minRest = minutes % 10
    const secRest = seconds % 10
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
    return {minutes, seconds, minUnitCase, secUnitCase}
}

export { getTimeWithUnits, toStorage, numberFromStorage, 
    booleanFromStorage, stringFromStorage, fromStorage, getRandomIndex,
    delayedAction 
}
