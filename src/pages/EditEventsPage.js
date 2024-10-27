import '../styles/style.css';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useAuth } from '../context/AuthContext';
import EventForm from '../components/EventForm';
import dayjs from 'dayjs';

export default function EditEventPage() {
    const [event, setEvent] = useState()
    const { id: eventId } = useParams();

    const { user, loading } = useAuth();
    console.log(event)


    useEffect(() => {
        if (!eventId || !user || !user.email) return;

        const fetchEvent = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_ENDPOINT}/api/events/${eventId}`,
                    {
                        withCredentials: true
                    }
                );

                const {
                    eventName,
                    eventDescription,
                    imageUrl,
                    endDate,
                    startDate,
                    goalAmount,
                    currentMoney,
                    organizers
                } = response.data;

                setEvent({
                    eventName,
                    currentMoney,
                    goalAmount,
                    organizers,
                    description: eventDescription,
                    startDate: dayjs(startDate),
                    endDate: dayjs(endDate),
                    imageUrl
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchEvent();
    }, [eventId, user]);

    const handleSubmit = async (formValues) => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_ENDPOINT}/api/events/${eventId}`,
                formValues,
                {
                    withCredentials: true
                }
            );
            console.log('Event updated:', response.data);
            alert('Event successfully updated!');
        } catch (error) {
            console.error('Failed to update event:', error);
        }
    };

    if (loading || !event) {
        return <div>Loading...</div>
    }

    return (
        <EventForm
            initialFormValues={event}
            currentUserEmail={user.email}
            submitCallback={handleSubmit}
        />
    );
}