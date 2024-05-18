import { useState, useEffect } from 'react';
import EventCard from "../components/EventCard";
import Navbar from "../components/Navbar";
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import '../styles/Card.css'
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

export default function EventsPage() {
  const [events, setEvents] = useState([]); 
  useEffect(() => {
    axios.get('http://localhost:5000/events')
      .then(response => {
        let events = []

        for (let event of response.data) {
          let newEvent = {
            ...event,
            end_date: new Date(event.end_date),
            start_date: new Date(event.start_date)
          }

          events.push(newEvent)
        }

        setEvents(events);
      })
      .catch(error => {
        console.log(error);
      });
    }, []);
    
    return (
    <ThemeProvider theme={theme}>
          {/* <AppBar
            position="fixed"
            sx={{
              boxShadow: 0,
              bgcolor: 'transparent',
              backgroundImage: 'none',
              mt: 2,
            }}
          ></AppBar> */}
      <Container
        className = "width-no-space"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          pt: { xs: 12, sm: 12 },
          pb: { xs: 12, sm: 12 },
          px: 0,
          backgroundColor: '#D3E9FF',
          minHeight: '100vh',
        }}
      >
        <Navbar />
        <Typography sx={{fontFamily: "Poppins", padding: 2, color:'#021944', fontWeight: 'bold', textAlign: 'left'}} variant="h4" component="div">
        Upcoming Events
        </Typography>
        {
          events && events.length > 0 ? events.map((event, index) => 
            <EventCard event={event} key={index} manageEventView={false}/>
          ) : <h3>No events found</h3>
        }
      </Container>
      </ThemeProvider>
    );
  }