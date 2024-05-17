import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../styles/Card.css'
import Button from '@mui/material/Button';

export default function EventCard({event}) {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className='card'>
        <div className="column">
            <h1>{event.event_name}</h1>
            <p><i>Organized by: {event.event_owner}</i></p>
            <p>{event.event_description}</p>
            <p>Goal: ${event.goal_amount}</p>
            <p>Current: ${event.current_money}</p>
        </div>
        <div className="column">
            <p>End Date: {event.end_date.toISOString().substring(0, 10)}</p>
            <p>Goal: ${event.target_money}</p>
        </div>
            <Button color="custom"
              variant="outlined"
              onClick={() => setIsExpanded(!isExpanded)}>
            Learn More</Button>
            {/*conditional render this*/}
            {isExpanded && (
                <>
                    <p>{event.event_description}</p>
                    <Link to={`DonatePage/${event._id}`}>
                        <Button 
                            color="custom"
                            variant="outlined"
                        >Donate
                        </Button>
                    </Link>
                </>
            )}
        </div>
    );
}