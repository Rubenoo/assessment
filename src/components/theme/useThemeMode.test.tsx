import { describe, expect, it } from 'vitest';
import { getNextMode, ThemeMode } from './useThemeMode';

describe('getNextMode', () => {
    it('switches to dark mode from any non-dark mode', () => {
        expect(getNextMode(ThemeMode.light)).toBe(ThemeMode.dark);
        expect(getNextMode('system')).toBe(ThemeMode.dark);
        expect(getNextMode(undefined)).toBe(ThemeMode.dark);
    });

    it('switches back to light mode from dark mode', () => {
        expect(getNextMode(ThemeMode.dark)).toBe(ThemeMode.light);
    });
});
