import { describe, expect, it } from 'vitest';
import { searchStations } from './station';

describe('searchStations', () => {
    it('returns all stations when the query is empty', async () => {
        const results = await searchStations('');
        expect(results.length).toBeGreaterThan(0);
    });

    it('matches stations by code, case-insensitively', async () => {
        const results = await searchStations('ams');
        expect(results).toContainEqual(expect.objectContaining({ code: 'AMS' }));
    });

    it('matches stations by name substring', async () => {
        const results = await searchStations('rotterdam');
        expect(results).toContainEqual(expect.objectContaining({ code: 'RTM' }));
    });

    it('returns no results for a query that matches nothing', async () => {
        const results = await searchStations('doesnotexist');
        expect(results).toEqual([]);
    });
});
