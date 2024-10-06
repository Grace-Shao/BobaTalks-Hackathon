import '../styles/style.css';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

import CreateEventForm from '../components/EventForm';

import { useAuth } from '../context/AuthContext';

export default function CreateEventPage() {
    
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>
    }

    let initialFormValues = {
        currentMoney: '',
        goalAmount: '',
        eventName: '',
        organizers: [ user.email ], // Auto-add current user's email
        description: '',
        startDate: null,
        endDate: null,
        imageUrl: '',
    }


    return (
        <CreateEventForm initialFormValues={initialFormValues} currentUserEmail={user.email} />
    )
  }
