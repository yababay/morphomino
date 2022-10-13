import { Level, PartOfSpeech, MorminoItem } from '../../types'

export default async function loadLevel(level: string){
    const {fileNames} = new Level(`CLASS_${level}`)
    await Promise.all(fileNames.map(({pos, path}) => {
        return fetch(path)
            .then(res => res.text())
            .then(txt => {
                return txt.split('\n')
                    .map($=> $.trim())
                    .filter($=> $ && $.length < 13)
                    .map(word => ({pos, word}))
            })
    }))
    .then(arr => {
        const dict = arr.reduce((acc, curr) => [...acc, ...curr], [])
        MorminoItem.setDictionary(dict)   
        PartOfSpeech.setStatistics(dict.map($ => $.pos).sort(el => 1 - Math.random()))
    })
    .catch(err => console.log(err))
}
