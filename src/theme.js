import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    custom: {
      main: '#FFFFFF',
    },
    primary: {
      main: '#EDAB6F',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

export default theme;