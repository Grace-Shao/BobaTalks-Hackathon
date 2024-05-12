import EventCard from "../components/EventCard";
import Navbar from "../components/Navbar";
export default function EventsPage() {
    return (
      <div>
        <Navbar />
        <h1>Events</h1>
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    );
  }