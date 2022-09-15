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
 
describe('testing keys by name', () => {
  test('keys are equal by string', () => {
    expect(PartsOfSpeech.NOUN === PartsOfSpeech['NOUN']).toBe(true)
  })
  test('keys are equal by number', () => {
    expect(PartsOfSpeech.NOUN === 0).toBe(true)
  })
})

describe('testing 100 random poses', () => {
  const pos = getRandomPos()
  test('pos is in correct range', () => {
    for(let i = 0; i < 100; i++)
      expect(
        pos === PartsOfSpeech.ADJECTIVE ||
        pos === PartsOfSpeech.ADVERB ||
        pos === PartsOfSpeech.CONJUNCTION ||
        pos === PartsOfSpeech.INTERJECTION ||
        pos === PartsOfSpeech.NOUN ||
        pos === PartsOfSpeech.PREPOSITION ||
        pos === PartsOfSpeech.PRONOUN ||
        pos === PartsOfSpeech.VERB
      ).toBe(true)
  })
})
