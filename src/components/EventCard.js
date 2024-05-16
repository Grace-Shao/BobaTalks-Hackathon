import { Link } from 'react-router-dom'
import '../styles/Card.css'
import Button from '@mui/material/Button';

export default function EventCard({event}) {
    return (
        <div className="card">
        <div className="column">
          <h2>{event.event_name}</h2>
          <p><i>Organized by: {event.event_owner}</i></p>
          <p>{event.event_description}</p>
          <p>Current: ${event.current_money}</p>
          </div>
          <div className="column">
          <p>Deadline: {event.deadline}</p>
          <p>Goal: ${event.target_money}</p>
          </div>
          <Link to={`Event/:id`}>
          <Button
              color="custom"
              variant="outlined"
            >
              Learn More
            </Button>
          </Link>
          
      </div>
    );
}