import '../styles/CreateEventPage.css';
import Navbar from '../components/Navbar';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useState } from 'react';

export default function CreateEventPage() {
    const [post, setPost] = useState({eventName: '', eventDescription: '', goalAmount: '', numOfPeople: '', uploadPhotos: ''})
    const createEvent = async (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/events', post)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }
    const handleChange = (event) => {
        // form input element that the user is interacting with
        const {name, value} = event.target;
        setPost(prevPost => ({...prevPost, [name]: value}));
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
                <label htmlFor="eventName">Event Name:</label>
                <input type="text" id="eventName" name="eventName" onChange={handleChange} />

                <label htmlFor="eventOwner">Event Owner:</label>
                <input type="text" id="eventOwner" name="eventOwner" onChange={handleChange} />

                <label htmlFor="eventDescription">Event Description:</label>
                <input type="text" id="eventDescription" name="eventDescription" onChange={handleChange} />

                <label htmlFor="goalAmount">Goal Amount:</label>
                <input type="number" id="goalAmount" name="goalAmount" onChange={handleChange} />

                {/* <label htmlFor="numOfPeople">Number of People:</label>
                <input type="number" id="numOfPeople" name="numOfPeople" onChange={handleChange} /> */}
                
                {/* <label htmlFor="uploadPhotos">Upload Photos:</label>
                <input type="file" id="uploadPhotos" name="uploadPhotos" accept="image/*" multiple onChange={handleChange} /> */}

                <button type="submit">Create Campaign</button>
            </form>
            </Container>
        </div>
    );
  }