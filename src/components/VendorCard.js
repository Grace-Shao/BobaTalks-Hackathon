import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../styles/Card.css'
import Button from '@mui/material/Button';

export default function EventCard({event}) {
    return (
        <div className='smallCard'>
        <div className="column">
            <h1>{event.vendor_name}</h1>
            <p>location: {event.location}</p>
            <p><i>Specialty: {event.specialty}</i></p>
            <Button color="custom"
              variant="outlined">
            Learn More</Button>
        </div>
        <div className="column">
            <img src={event.imageUrl} alt="Vendor Logo" width="200" height="200"></img>
        </div>
        </div>
    );
}