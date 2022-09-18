import { PartsOfSpeech } from '../src/model';
import { describe, expect, test } from '@jest/globals'

describe('testing keys by name', () => {
    test('keys are equal by string', () => {
        expect(PartsOfSpeech.NOUN === PartsOfSpeech['NOUN']).toBe(true)
    })
    test('keys are equal by number', () => {
        expect(PartsOfSpeech.NOUN === 0).toBe(true)
    })
    test('string by number', () => {
        expect(PartsOfSpeech[0] === 'NOUN').toBe(true)
    })
    test('string by string', () => {
        expect(PartsOfSpeech[PartsOfSpeech.NOUN] === 'NOUN').toBe(true)
    })
})
