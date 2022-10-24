import lineReader from 'line-reader'
import { readFileSync, existsSync, writeFileSync } from 'fs'
import Showdown from 'showdown'
const converter = new Showdown.Converter()
const output = []

lineReader.eachLine('./src/assets/template.html', function(line, last) {
  if(last){
    writeFileSync('index.html', output.join('\n'))
    console.log('Файл index.html успешно создан из шаблона.')
  }  
  if(!/<section[^>]+><\/section>/.test(line)) {
    output.push(line)
    return
  }
  const idEntry = /id=[\"\'](\w+)[\"\']/.exec(line)
  if(!idEntry){
    output.push(line)
    return
  }
  const id = idEntry[1]
  if(id === 'loader'){
    output.push(line)
    return
  } 
  const sectionCloseTag = '</section>'
  const sectionOpenTag = line.replace(sectionCloseTag, '')
  const spaces = /^(\s+)/.exec(line)[1]
  output.push(sectionOpenTag)
  output.push(getContent(id, spaces))
  output.push(spaces + sectionCloseTag)

});

function getContent(id, spaces){
  const fn = `./src/assets/${id}.md`
  if(!existsSync(fn)) return //throw 'Не найден файл для секции ' + id
  const lines = readFileSync(fn, 'utf8')
  const article = converter.makeHtml(lines).trim().split('\n').map($=> `${spaces}${spaces}${parseLine($)}`).join('\n')
  return `<article>${article}</article>`
}

function parseLine(line){
  line = line.trim()
  const imgEntity = /<img.*alt="([^"]+)".*\/>/.exec(line)
  if(imgEntity && imgEntity[1]){
    const [_, caption] = imgEntity
    line = line.replace('<p>', '<figure>')
    line = line.replace('</p>', `<figcaption>${caption}</figcaption></figure>`)
  }
  return line
}
