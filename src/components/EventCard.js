import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../styles/Card.css'
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';

export default function EventCard({event, manageEventView, deleteEvent}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const progress = (event.current_money / event.goal_amount) * 100;

    return (
        <div className='card'>
        <div className="column">
            <h1>{event.event_name}</h1>
            <p><i>Organized by: {event.event_owner}</i></p>
            <Tooltip title={`Current Money: ${event.current_money}, Goal: ${event.goal_amount}`}>
                <LinearProgress variant="determinate" value={progress}
                sx={{ 
                height: '20px', 
                borderRadius: '20px',
                backgroundColor: 'white', 
                '& .MuiLinearProgress-bar': { 
                borderRadius: '20px', 
                backgroundColor: 'green.500', 
                } 
            }}  />
            </Tooltip>    
        </div>

        <div className="column">
            <p>Ending on {event.end_date.toISOString().substring(0, 10)}</p>
            {event.img_url ? (
            <img
                src={event.img_url}
                height="150px"
                width="250px"
                style={{ objectFit: 'cover', borderRadius: '10px'}}
            />
            ) : null} 
            {!manageEventView && (
                <>
                    <Button color="custom"
                    variant="outlined"
                    onClick={() => setIsExpanded(!isExpanded)}>
                        Learn More
                    </Button>
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
                </>
            )}
            {manageEventView && (
                <>
                    <Link to={`EditEvent/${event._id}`}>
                        <Button color="custom"
                        variant="outlined">
                            Edit Event
                        </Button>
                    </Link>
                    <Button color="custom"
                    variant="outlined"
                    onClick={() => deleteEvent(event._id)}>
                        Delete Event
                    </Button>
                </>
            )}
        </div>
        </div>
    );
}