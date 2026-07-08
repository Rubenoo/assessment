import { useColorScheme } from '@mui/material/styles';

export const ThemeMode = {
    light: 'light',
    dark: 'dark',
} as const;

export type ThemeModeValue = (typeof ThemeMode)[keyof typeof ThemeMode];

export function getNextMode(mode: string | undefined): ThemeModeValue {
    return mode === ThemeMode.dark ? ThemeMode.light : ThemeMode.dark;
}

function useThemeMode() {
    const { mode, setMode } = useColorScheme();

    const toggleMode = () => {
        setMode(getNextMode(mode));
    };

    return { mode: mode ?? ThemeMode.light, toggleMode };
}

export default useThemeMode;
