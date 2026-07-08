import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    spacing: 8,
    colorSchemes: {
        light: {
            palette: {
                primary: { main: '#1565c0' },
                background: { default: '#f5f5f5', paper: '#ffffff' },
            },
        },
        dark: {
            palette: {
                primary: { main: '#90caf9' },
                background: { default: '#121212', paper: '#1e1e1e' },
            },
        },
    },
});

export default theme;
