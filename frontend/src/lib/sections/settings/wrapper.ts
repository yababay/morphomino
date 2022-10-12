import { writable } from 'svelte/store'
import type { Writable } from 'svelte/types/runtime/store/index'

function prepareForStorage(value: string | boolean | number | object): string{
    return typeof value === 'object' ? JSON.stringify(value) : `${value}`
}

export default function wrapSetting(key: string, byDefault: string | number | boolean | object): Writable<string | number | boolean | object>{
    let value: string | number | boolean | object = localStorage.getItem(key)
    if(!value){
        localStorage.setItem(key, prepareForStorage(byDefault))
        value = byDefault
    }
    else {
        switch (typeof byDefault) {
            case 'number':
                value = parseFloat(value)
                break
            case 'boolean':
                value = value === 'true'
                break
            case 'object':
                value = JSON.parse(value)
        }
    }
    let writer = writable(value)
    writer.subscribe($value => {
        localStorage.setItem(key, prepareForStorage($value)) 
    })
    return writer
}
