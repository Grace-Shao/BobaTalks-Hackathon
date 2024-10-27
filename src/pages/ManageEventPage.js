import '../styles/style.css';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import EventCard from '../components/EventCard';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function ManageEventPage() {
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/events/user/`,
        { withCredentials: true }
      );
    
      let events = response.data.map(event => ({
        ...event,
        endDate: new Date(event.endDate),
        startDate: new Date(event.startDate)
      }));

      console.log(events)
    
      setEvents(events);
    } catch (error) {
      console.error(error);
    }    
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
    <Container
      className="width-no-space"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: { xs: 12, sm: 12 },
        pb: { xs: 12, sm: 12 },
        px: { xs: 2, sm: 4 },
        backgroundColor: '#D3E9FF',
        minHeight: '100vh',
      }}
    >
      <Typography
        sx={{
          fontFamily: "Poppins",
          mb: 4,
          color: '#021944',
          fontWeight: 'bold',
          width: '100%',
          textAlign: { xs: 'center', sm: 'left' }
        }}
        variant="h4"
      >
        Manage Events
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {events && events.length > 0 ? (
          events.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <EventCard event={event} manageEventView={true} deleteEvent={deleteEvent} />
            </Grid>
          ))
        ) : (
          <Typography variant="h6">No events to manage</Typography>
        )}
      </Grid>
    </Container>
  );
}
