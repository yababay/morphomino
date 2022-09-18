function saveValue(event, key: string, writable = null){
    let {target} = event
    let {value} = target
    if(target.type !== 'checkbox' && !isNaN(value)) value = parseInt(value)
    localStorage.setItem(key, value)
    if(writable) writable.set(value)
}

function fromStorage(key, min){
    let val = localStorage.getItem(key) || min
    if(['true', 'false'].includes(val)) val = val === 'true'
    else if(!isNaN(val)) val = parseInt(val)
    return val
}

function getTimeWithUnits(seconds: number) {
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

export { getTimeWithUnits, saveValue, fromStorage }
