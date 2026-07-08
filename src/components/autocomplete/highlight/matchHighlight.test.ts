import { describe, expect, it } from 'vitest';
import { getMatchParts } from './matchHighlight';

describe('getMatchParts', () => {
    it('marks the matching substring, case-insensitively', () => {
        expect(getMatchParts('Amsterdam Centraal', 'ams')).toEqual([
            { text: 'Ams', matched: true },
            { text: 'terdam Centraal', matched: false },
        ]);
    });

    it('marks the whole text as unmatched when the query is empty', () => {
        expect(getMatchParts('Amsterdam Centraal', '')).toEqual([
            { text: 'Amsterdam Centraal', matched: false },
        ]);
    });

    it('marks the whole text as unmatched when there is no match', () => {
        expect(getMatchParts('Amsterdam Centraal', 'xyz')).toEqual([
            { text: 'Amsterdam Centraal', matched: false },
        ]);
    });
});
