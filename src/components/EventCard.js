import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../styles/Card.css'
export default function EventCard({event}) {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className="card">
            <h1>{event.event_name}</h1>
            <p>Organized by: {event.event_owner}</p>
            <p>{event.event_description}</p>
            <p>Goal: ${event.goal_amount}</p>
            <p>Current: ${event.current_money}</p>
            <p>End Date: {event.end_date.toISOString().substring(0, 10)}</p>
            <button onClick={() => setIsExpanded(!isExpanded)}>Learn More</button>
            {/*conditional render this*/}
            {isExpanded && (
                <>
                    <p>{event.event_description}</p>
                    <Link to={`DonatePage/${event._id}`}>
                        <button className="donateButton">Donate</button>
                    </Link>
                </>
            )}
        </div>
    );
}