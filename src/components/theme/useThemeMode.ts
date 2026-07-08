import { useColorScheme } from '@mui/material/styles';

function useThemeMode() {
    const { mode, setMode } = useColorScheme();

    const toggleMode = () => {
        setMode(mode === 'dark' ? 'light' : 'dark');
    };

    return { mode: mode ?? 'light', toggleMode };
}

export default useThemeMode;
