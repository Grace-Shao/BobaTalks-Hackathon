import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../styles/Card.css'
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';

export default function EventCard({event}) {
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
            <Button color="custom"
              variant="outlined"
              onClick={() => setIsExpanded(!isExpanded)}>
            Learn More</Button>
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
        </div>
    );
}