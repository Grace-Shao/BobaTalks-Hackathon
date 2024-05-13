import EventCard from "../components/EventCard";
import Navbar from "../components/Navbar";
import Container from '@mui/material/Container';

export default function EventsPage() {
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
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </Container>
    );
  }