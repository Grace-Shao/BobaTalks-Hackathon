import '../styles/CreateEventPage.css';
import Navbar from '../components/Navbar';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useState } from 'react';

export default function CreateEventPage() {
    const [post, setPost] = useState({eventName: '', eventDescription: '', goalAmount: ''})
    const numberFields = ['goal_amount']; // add any other number fields here

    const createEvent = async (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/events', post)
            .then(response => {
                console.log(response.data);
                alert('Event successfully created!');

            })
            .catch(error => {
                console.error(error);
            });
    }
    const handleChange = (event) => {
        // form input element that the user is interacting with
        const {name, value} = event.target;
        setPost(prevPost => ({
            ...prevPost, 
            [name]: numberFields.includes(name) ? Number(value) : value
        }));
    }
    return (
        <div>
            <Navbar />
            <Container
                sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: { xs: 14, sm: 20 },
                pb: { xs: 8, sm: 12 },
                }}
            >
            <h1>Create an Event</h1>
            <form onSubmit={createEvent}>
                <label htmlFor="event_name">Event Name:</label>
                <input type="text" id="event_name" name="event_name" onChange={handleChange} />

                <label htmlFor="event_owner">Event Owner:</label>
                <input type="text" id="event_owner" name="event_owner" onChange={handleChange} />

                <label htmlFor="event_description">Event Description:</label>
                <input type="text" id="event_description" name="event_description" onChange={handleChange} />

                <label htmlFor="start_date">Start Date:</label>
                <input type="date" id="start_date" name="start_date" onChange={handleChange} />

                <label htmlFor="end_date">End Date:</label>
                <input type="date" id="end_date" name="end_date" onChange={handleChange} />

                <label htmlFor="goal_amount">Goal Amount:</label>
                <input type="number" id="goal_amount" name="goal_amount" onChange={handleChange} />

                <button type="submit">Create Campaign</button>
            </form>
            </Container>
        </div>
    );
  }