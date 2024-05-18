import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../styles/style.css';

const theme = createTheme({
  palette: {
    custom: {
      main: '#FFFFFF',
      light: '#FFFFFF',
      dark: '#FFFFFF',
      contrastText: '#FFFFFF',
    },
  },
});

export default function SignUpForm() {
  return (
    <ThemeProvider theme={theme}>
      <Container
      className = "width-no-space"
      disableGutters
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 11, sm: 11},
          pb: { xs: 8, sm: 12 },
          // px: {xs: 80, sm:80},
          maxWidth: 0,
          width: '100%',
          bgcolor: '#EDAB6F',
        }}
      >
        <span className="circle"></span>
        <Typography sx={{fontFamily: "Poppins", padding: 2, color:'#021944', fontWeight: 'bold'}} variant="h4" component="div">
          Enter account details
        </Typography>
        <TextField sx={{mt: 1, border: '2px solid', borderColor: 'black', background: '#FFFFFF', width: 500}} 
        id="outlined-basic" label="Full Name" variant="outlined" />
        <TextField sx={{mt: 1, border: '2px solid', borderColor: 'black', background: '#FFFFFF', width: 500}} 
        id="outlined-basic" label="Email Address" variant="outlined" />
        <TextField sx={{mt: 1, border: '2px solid', borderColor: 'black', background: '#FFFFFF', width: 500}} 
        id="outlined-basic" label="Password" variant="outlined" />
        <TextField sx={{mt: 1, border: '2px solid', borderColor: 'black', background: '#FFFFFF', width: 500}} 
        id="outlined-basic" label="Confirm Password" variant="outlined" />
        <Button sx={{mt: 1}} color="custom" variant="outlined" href="/SignIn"> Register </Button>

      </Container>
      </ThemeProvider>
  );
}