import { PartsOfSpeech, MorphominoItem, getRandomPos } from '../src/lib/models';
import { describe, expect, test } from '@jest/globals'

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
        for (let i = 0; i < 100; i++)
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
