import { progress, processHash } from './router'
import { PartsOfSpeech, PartOfSpeech, MorminoItem } from '../model'

const posKeys = PartOfSpeech.getKeyNames()
const posKeyLength = posKeys.length

function setLoader(res:Response, i:number): Promise<string> {
    return res.text().then(txt => 
        new Promise((yep) => {
            setTimeout(() => {
                progress.set(100 * i / posKeyLength)
                yep(txt)
            }, 200 * i)
        })
    )
}

export default async ()=> await Promise.all(posKeys.map((key, i) => 
    fetch(`./assets/${key.toLowerCase()}s.txt`)
        .then(res => setLoader(res, i))
        .then((txt:string) => txt.split('\n')
            .map(word => ({pos: PartsOfSpeech[key], word: word && word.trim() || ''}))
            .filter(item => item.word && item.word.length < 13)
        ))
    )
    .then(arr => {
        const dict = arr.reduce((acc, curr) => [...acc, ...curr], [])
        MorminoItem.setDictionary(dict)   
        PartOfSpeech.setStatistics(dict.map(el => el.pos).sort(el => 1 - Math.random()))
        progress.set(95)
        setTimeout(() => {progress.set(100);processHash()}, 1000)
    })
    .catch(err => console.log(err))
