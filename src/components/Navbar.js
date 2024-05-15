import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
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

function Navbar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container className="navbar-no-space" maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              bgcolor: '#EDAB6F',
              backdropFilter: 'blur(24px)',
              maxHeight: 100,
              border: '1px solid',
              borderColor: 'divider',
              // width: '100%',
              // pl: '100px',
              // pr: '100px',
              pt: '0',
              px: '100%',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <MenuItem
                component={Link}
                to="/"
              >
                <Typography variant="body2" color="text.primary">
                <h3 style={{fontFamily: "Poppins", color:'white', paddingLeft:'10px'}}>Boba Talks</h3>
                </Typography>
              </MenuItem>
                <MenuItem
                  component={Link}
                  to="/EventsPage"
                  sx={{ py: '6px', px: '12px' }}
                >
                  {/* <Typography style={{color:'white'}} variant="body2" color="text.primary">
                    All Events
                  </Typography> */}
                  <h4 style={{fontFamily: "Poppins", color:'white', fontWeight: 'normal'}}>All Events</h4>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/CreateEventPage"
                  sx={{ py: '6px', px: '12px' }}
                >

                  <h4 style={{fontFamily: "Poppins", color:'white', fontWeight: 'normal'}}>Create Event</h4>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection('testimonials')}
                  sx={{ py: '6px', px: '12px' }}
                >

                  <h4 style={{fontFamily: "Poppins", color:'white', fontWeight: 'normal'}}>Manage Event</h4>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <Button
                color="custom"
                variant="outlined" 
                href="/SignIn"
              >
                Sign in
              </Button>
              <Button
                color="custom"
                variant="outlined"
                href="/SignUp"
              >
                Sign up
              </Button>
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      </ThemeProvider>
    </div>
  );
}

Navbar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default Navbar;