import { describe, expect, it } from 'vitest';
import { hasOverlap, resolveFilter } from './originDestinationFilter';
import type { Station } from '../../data/stations/station';

const ams: Station = { id: 'ams', name: 'Amsterdam Centraal', code: 'AMS', group: 'Netherlands' };
const rtm: Station = { id: 'rtm', name: 'Rotterdam Centraal', code: 'RTM', group: 'Netherlands' };
const bru: Station = { id: 'bru', name: 'Brussels Central', code: 'BRU', group: 'Belgium' };

describe('hasOverlap', () => {
    it('returns false when no station is shared between the lists', () => {
        expect(hasOverlap([ams], [rtm, bru])).toBe(false);
    });

    it('returns true when a station appears in both lists', () => {
        expect(hasOverlap([ams, rtm], [rtm, bru])).toBe(true);
    });

    it('returns true when the lists are identical', () => {
        expect(hasOverlap([ams, rtm], [ams, rtm])).toBe(true);
    });
});

describe('resolveFilter', () => {
    it('keeps origins and destinations independent when mirroring is off', () => {
        expect(resolveFilter([ams], [rtm, bru], false)).toEqual({
            origins: [ams],
            destinations: [rtm, bru],
        });
    });

    it('allows the user to mirror destinations to origins for symmetric routes', () => {
        expect(resolveFilter([ams, rtm], [bru], true)).toEqual({
            origins: [ams, rtm],
            destinations: [ams, rtm],
        });
    });
});
