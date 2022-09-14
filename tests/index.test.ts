import { PartsOfSpeech, MorphominoItem, getRandomPos } from '../src/lib/parts-of-speech';
import {describe, expect, test } from '@jest/globals'

describe('testing import', () => {
  test('import is successfull', () => {
    expect(typeof getRandomPos).toBe('function');
  })
})
 
describe('testing items behavior', () => {
  const word = 'барабулька'
  const item = new MorphominoItem(word, PartsOfSpeech.NOUN)
  test('value is correct', () => {
    expect(item.value).toBe(word)
  })
  test('pos is correct', () => {
    expect(item.pos).toBe(PartsOfSpeech.NOUN)
  })
})
 
describe('testing comparation', () => {
  const word1 = 'барабулька'
  const item1 = new MorphominoItem(word1, PartsOfSpeech.NOUN)
  const word2 = 'карась'
  const item2 = new MorphominoItem(word2, PartsOfSpeech.NOUN)
  test('poses are equal', () => {
    expect(item1.isCongeneric(item2)).toBe(true)
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
