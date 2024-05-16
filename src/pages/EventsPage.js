import { useState, useEffect } from 'react';
import EventCard from "../components/EventCard";
import Navbar from "../components/Navbar";
import axios from 'axios';
import Container from '@mui/material/Container';

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

      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Navbar />
        <h1>Events</h1>
        {
          events && events.length > 0 ? events.map((event, index) => 
            <EventCard event={event} key={index} />
          ) : <h3>No events found</h3>
        }
      </Container>
    );
  }