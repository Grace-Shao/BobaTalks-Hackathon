import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../styles/Card.css'
export default function EventCard({event}) {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className="card">
            <div>
                <h1 class="card_event-name">{event.event_name}</h1>
                <p class="card_organization">Organized by: {event.event_owner}</p>
                <p class="card_goal">Goal Amount: ${event.goal_amount}</p>
                {/*conditional render this*/}
                {isExpanded && (
                    <>
                        <p class="text-lg">Amount Raised: ${event.current_money}</p>
                        <p>{event.event_description}</p>
                    </>
                )}
            </div>
            <div class="card_right-div">
                <p>End Date: {event.end_date.toISOString().substring(0, 10)}</p>
                {!isExpanded && (
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        class="card_learn-more">
                        Learn More</button>
                )}
                
                {isExpanded && (
                    <Link to={`DonatePage/${event._id}`}>
                        <button className="donateButton">Donate</button>
                    </Link>
                )}
            </div>
                                    
            
        </div>
    );
}