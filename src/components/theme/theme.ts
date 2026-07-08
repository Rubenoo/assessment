import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontFamily: '"Poppins", "Montserrat", sans-serif',
            fontWeight: 600,
            fontSize: '2.125rem',
        },
    },
    colorSchemes: {
        light: {
            palette: {
                primary: { main: '#A00CEB' },
                secondary: { main: '#00A2BF' },
                background: { default: '#F2F9FA', paper: '#ffffff' },
            },
        },
        dark: {
            palette: {
                primary: { main: '#C77DF3' },
                secondary: { main: '#4DD0E1' },
                background: { default: '#1A0B22', paper: '#241130' },
            },
        },
    },
});

export default theme;
