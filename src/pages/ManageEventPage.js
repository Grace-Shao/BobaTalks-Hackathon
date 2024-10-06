import '../styles/style.css';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import EventCard from '../components/EventCard';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';

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

export default function ManageEventPage() {

  const { user } = useAuth();

  const [events, setEvents] = useState([]);

  const getEvents = () => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/events/user/${user.email}`)
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
  }

  useEffect(() => {
    getEvents();
    }, []);

    const deleteEvent = async (event_id) => {
      if (window.confirm('Are you sure you want to delete this event?')) {
          try {
              const response = await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/events/${event_id}`);
              alert('Event deleted successfully');
              let newEvents = events.filter(event => event._id !== event_id);
              setEvents(newEvents);
          } catch (error) {
              console.error('Failed to delete event:', error);
              alert(error.response?.data?.message || 'Error deleting event');
          }
      }
  }

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
          minHeight: '100vh',
        }}
      >
        <Typography sx={{fontFamily: "Poppins", padding: 2, color:'#021944', fontWeight: 'bold', textAlign: 'left'}} variant="h4" component="div">
        Manage Events
        </Typography>
        {
          events && events.length > 0 ? events.map((event, index) =>
            <EventCard event={event} key={index} manageEventView={true} deleteEvent={deleteEvent} />
          ) : <h3>No events to manage</h3>
        }
      </Container>
      </ThemeProvider>
    );
}
