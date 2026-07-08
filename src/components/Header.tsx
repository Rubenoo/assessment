import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { spacingTokens } from './theme/spacing';
import useThemeMode, { ThemeMode } from './theme/useThemeMode';

function Header() {
    const { mode, toggleMode } = useThemeMode();

    return (
        <Stack
            component="header"
            direction="row"
            sx={{
                py: spacingTokens.md,
                px: spacingTokens.lg,
                borderBottom: spacingTokens.sm,
                borderColor: 'divider',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Typography variant="h1" color="primary">
                Sqills Assessment
            </Typography>
            <FormControlLabel
                control={<Switch checked={mode === ThemeMode.dark} onChange={toggleMode} />}
                label={mode === ThemeMode.dark ? 'Dark mode' : 'Light mode'}
                labelPlacement="start"
                sx={{ mr: "unset" }}
            />
        </Stack>
    )
}

export default Header
