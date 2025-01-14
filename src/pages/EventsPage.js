import { useState, useEffect } from 'react';
import EventCard from "../components/EventCard";
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
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
          Upcoming Events
        </Typography>


        <Grid container spacing={3} justifyContent="center">
          {events && events.length > 0 ? (
            events.map((event, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <EventCard event={event} manageEventView={false} />
              </Grid>
            ))
          ) : (
            <Typography variant="h6">No events found</Typography>
          )}
        </Grid>
      </Container>
    </>
  );
}