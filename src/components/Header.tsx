import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import useThemeMode, { ThemeMode } from './theme/useThemeMode';

function Header() {
    const { mode, toggleMode } = useThemeMode();

    return (
        <Stack
            component="header"
            direction="row"
            sx={{
                py: 2,
                borderBottom: 1,
                borderColor: 'divider',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Typography variant="h4" component="h1" color="primary" sx={{ fontWeight: 600 }}>
                Sqills Assessment
            </Typography>
            <FormControlLabel
                control={<Switch checked={mode === ThemeMode.dark} onChange={toggleMode} />}
                label={mode === ThemeMode.dark ? 'Dark mode' : 'Light mode'}
                labelPlacement="start"
                sx={{ mr: 0 }}
            />
        </Stack>
    )
}

export default Header
