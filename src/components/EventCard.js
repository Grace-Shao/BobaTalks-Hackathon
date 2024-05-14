import { Link } from 'react-router-dom'
import '../styles/Card.css'
export default function EventCard({event}) {
    return (
        <div className="card">
            <h1>{event.event_name}</h1>
            <p>Organized by: {event.event_owner}</p>
            <p>{event.event_description}</p>
            <p>Goal: ${event.target_money}</p>
            <p>Current: ${event.current_money}</p>
            <p>Deadline: {event.deadline}</p>
            <Link to={`Event/:id`}>
                <button>Learn More</button>
            </Link>
        </div>
    );
}