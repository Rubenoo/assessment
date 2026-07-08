import { describe, expect, it } from 'vitest';
import { describeFilter, hasOverlap, resolveFilter } from './originDestinationFilter';
import type { Station } from '../../data/stations/station';

const ams: Station = { id: 'ams', name: 'Amsterdam Centraal', code: 'AMS', group: 'Netherlands' };
const rtm: Station = { id: 'rtm', name: 'Rotterdam Centraal', code: 'RTM', group: 'Netherlands' };
const bru: Station = { id: 'bru', name: 'Brussels Central', code: 'BRU', group: 'Belgium' };

describe('hasOverlap', () => {
    it('returns false when no station is shared between the lists', () => {
        expect(hasOverlap([ams], [rtm, bru], false)).toBe(false);
    });

    it('returns true when a station appears in both lists', () => {
        expect(hasOverlap([ams, rtm], [rtm, bru], false)).toBe(true);
    });

    it('returns true when the lists are identical', () => {
        expect(hasOverlap([ams, rtm], [ams, rtm], false)).toBe(true);
    });

    it('ignores the overlap while mirroring is on, since it is expected', () => {
        expect(hasOverlap([ams], [ams], true)).toBe(false);
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

describe('describeFilter', () => {
    it('prompts the user to complete the journey when either side is empty', () => {
        expect(describeFilter({ origins: [], destinations: [rtm] })).toBe(
            'Pick at least one origin and destination to see your journey.',
        );
        expect(describeFilter({ origins: [ams], destinations: [] })).toBe(
            'Pick at least one origin and destination to see your journey.',
        );
    });

    it('summarises the journey as origins pointing to destinations', () => {
        expect(describeFilter({ origins: [ams, rtm], destinations: [bru] })).toBe(
            'Amsterdam Centraal, Rotterdam Centraal → Brussels Central',
        );
    });
});
