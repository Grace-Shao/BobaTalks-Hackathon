// import '../styles/CreateEventPage.css';
import Navbar from '../components/Navbar';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function DonatePage() {
    const { id } = useParams();
    const [donationAmount, setDonationAmount] = useState(null);
    const [thankYouNote, setThankYouNote] = useState('');
    // const [post, setPost] = useState({eventName: '', eventDescription: '', goalAmount: ''})
    // const numberFields = ['goal_amount']; // add any other number fields here
    
    const handleDonation = (amount) => {
        setDonationAmount(amount);
    }
    // only donation and thank you note is added to the backend
    const submitDonation = async (event) => {
        event.preventDefault();
        const data = {
            "donation_amount": donationAmount,
            "thank_you_note": thankYouNote
        };
    
        try {
            await axios.put(`http://localhost:5000/events/donate/${id}`, data);
            console.log('Donation submitted');
        } catch (error) {
            console.error(error);
        }
    };

    // not doing anything with the other fields for now
    const handleChange = (event) => {
        setThankYouNote(event.target.value);
        // this code is if we want to do something with the other fields
        // form input element that the user is interacting with
        // const {name, value} = event.target;
        // setPost(prevPost => ({
        //     ...prevPost, 
        //     [name]: numberFields.includes(name) ? Number(value) : value
        // }));
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
                <h1>Give the gift of Boba!</h1>
                <form onSubmit={submitDonation}>
                    <label htmlFor="sender_name">Your Name (optional):</label>
                    <input type="text" id="sender_name" name="sender_name" onChange={handleChange} />

                    <label htmlFor="sender_email">Your Email:</label>
                    <input type="text" id="sender_email" name="sender_email" onChange={handleChange} />

                    <label htmlFor="payment_method">Payment Method:</label>
                    <input type="text" id="payment_method" name="payment_method" onChange={handleChange} />

                    <label htmlFor="donation_amount">Donation Amount:</label>
                    <div>
                        <button type="button" onClick={() => handleDonation(1)}>$1</button>
                        <button type="button" onClick={() => handleDonation(5)}>$5</button>
                        <button type="button" onClick={() => handleDonation(10)}>$10</button>
                    </div>

                    <label htmlFor="thank_you_note">Thank You Note (optional):</label>
                    <input type="text" id="thank_you_note" name="thank_you_note" onChange={handleChange} />

                    <button type="submit">Submit</button>
                </form>
            </Container>
        </div>
    );
  }