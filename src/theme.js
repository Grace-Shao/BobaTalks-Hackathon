import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    custom: {
      main: '#FFFFFF',
    },
    primary: {
      main: '#EDAB6F',
    },
    secondary: {
      main: '#021944',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '12px 24px',
          minWidth: '120px',
        }
      }
    }
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;