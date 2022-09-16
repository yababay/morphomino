import { PartsOfSpeech, MorphominoItem, getRandomPos } from '../src/lib/models';
import {describe, expect, test } from '@jest/globals'

describe('testing import', () => {
  test('import is successfull', () => {
    expect(typeof getRandomPos).toBe('function');
  })
})
 
describe('testing items behavior', () => {
  const word = 'барабулька'
  const pos = PartsOfSpeech.NOUN
  const item = new MorphominoItem({word, pos}, PartsOfSpeech.NOUN)
  test('value is correct', () => {
    expect(item.value).toBe(word)
  })
  test('next pos is correct', () => {
    expect(item.nextPos).toBe(PartsOfSpeech.NOUN)
  })
  test('self pos is correct', () => {
    expect(item.selfPos).toBe(PartsOfSpeech.NOUN)
  })
})
 
describe('testing comparation', () => {
  let word = 'барабулька'
  let pos = PartsOfSpeech.NOUN
  const item1 = new MorphominoItem({word, pos}, PartsOfSpeech.NOUN)
  word = 'карась'
  const item2 = new MorphominoItem({word, pos}, PartsOfSpeech.NOUN)
  test('poses are equal', () => {
    expect(item1.isCongeneric(item2)).toBe(true)
  })
})
