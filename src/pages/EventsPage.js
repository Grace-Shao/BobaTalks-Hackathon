import { useState, useEffect } from 'react';
import EventCard from "../components/EventCard";
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import '../styles/Card.css'


export default function EventsPage() {
  const [events, setEvents] = useState([]); 
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/events`,
          { withCredentials: true }
        );

        const events = response.data.map(event => ({
          ...event,
          endDate: new Date(event.endDate),
          startDate: new Date(event.startDate)
        }));

        setEvents(events);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, []);
    
    return (
      <>
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
        Upcoming Events
        </Typography>
        {
          events && events.length > 0 ? events.map((event, index) => 
            <EventCard event={event} key={index} manageEventView={false}/>
          ) : <h3>No events found</h3>
        }
      </Container>
      </>
    );
  }