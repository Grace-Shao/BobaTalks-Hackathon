import { useState, useEffect } from 'react';
import EventCard from "../components/EventCard";
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import '../styles/Card.css'
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VendorCard from '../components/VendorCard';
import bobaTalksLogo from '../imgs/bubbleTeaLogo.png';
import jeffLogo from '../imgs/jeff.png';
import kungFuTeaLogo from '../imgs/kungFuTeaLogo.png';

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

export default function BobaVendorsPage() {
    const vendors = [
        { vendor_name: 'Jeffs Boba for the Nguyen', location: 'Address 2', specialty: 'Homemade mom and pop shop', imageUrl: jeffLogo },
        { vendor_name: 'Kung Fu Tea', location: 'Address 3', specialty: 'Variety of flavors to choose from', imageUrl: kungFuTeaLogo },
        { vendor_name: 'Boba Talks ', location: 'Address 1', specialty: 'Popular among students', imageUrl: bobaTalksLogo },
        // Add more vendors as needed
    ];
    
    return (
    <ThemeProvider theme={theme}>
      <Container
        className = "width-no-space"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          pt: { xs: 12, sm: 12 },
          pb: { xs: 12, sm: 12 },
          px: 0,
          backgroundColor: '#D3E9FF',
          height: '1000px'
        }}
      >
        <Typography sx={{fontFamily: "Poppins", padding: 2, color:'#021944', fontWeight: 'bold', textAlign: 'left'}} variant="h4" component="div">
        Local Boba Vendors Nearby
        </Typography>
        {
          vendors && vendors.length > 0 ? vendors.map((vendor, index) => (
            <VendorCard event={vendor} key={index}/>
            )) : (<p>No vendors found</p>)
        }
      </Container>
      </ThemeProvider>
    );
  }