import '../styles/style.css';
import Navbar from '../components/Navbar';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      custom: {
        main: '#021944',
        light: '#021944',
        dark: '#021944',
        contrastText: '#021944',
      },
    },
  });

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
            await axios.put(`http://localhost:5000/events/${id}`, data);
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

    const handleCustom = (event) => {
        setDonationAmount(event.target.value);
        // this code is if we want to do something with the other fields
        // form input element that the user is interacting with
        // const {name, value} = event.target;
        // setPost(prevPost => ({
        //     ...prevPost, 
        //     [name]: numberFields.includes(name) ? Number(value) : value
        // }));
    }
    return (
        <ThemeProvider theme={theme}>
        <div>
            <Navbar />
            <Container
            className = "width-no-space"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: { xs: 14, sm: 20 },
                    pb: { xs: 8, sm: 12 },
                    backgroundColor: '#D3E9FF',
                    minHeight: '100px'
                }}
            >
                <h1>Give the gift of Boba!</h1>
                <form onSubmit={submitDonation}>
                <TextField sx={{mt: 1, border: '2px solid', borderColor: 'black', background: '#FFFFFF', width: 900}} 
        id="sender_name" name="sender_name" onChange={handleChange} label="Your Name (optional)" variant="outlined" />
                 <TextField sx={{mt: 1, border: '2px solid', borderColor: 'black', background: '#FFFFFF', width: 900}} 
        id="sender_email" name="sender_email" onChange={handleChange} label="Your Email" variant="outlined" />

                    {/* <label htmlFor="payment_method">Payment Method:</label>
                    <input type="text" id="payment_method" name="payment_method" onChange={handleChange} /> */}

                    <label htmlFor="donation_amount">Donation Amount:</label>
                    <div>
                    <Button
                className="buttonDonate"
                onClick={() => handleDonation(1)}
                color="custom"
                variant="outlined" 
              >
                <p>Give a Boba!</p>
              </Button>
                <Button
                className="buttonDonate"
                onClick={() => handleDonation(1)}
                color="custom"
                variant="outlined" 
              >
                $1
              </Button>
              <Button
              className="buttonDonate"
                onClick={() => handleDonation(5)}
                color="custom"
                variant="outlined" 
              >
                $5
              </Button>
              <Button
              className="buttonDonate"
                    onClick={() => handleDonation(10)}
                  
                color="custom"
                variant="outlined" 
              >
                $10
              </Button>
              <input
              className="donateCustom"
                    onChange={() => handleCustom()}
                    placeholder='CUSTOM'
                color="custom"
                variant="outlined" 
              >
              </input>
                    </div>
                    <TextField sx={{mt: 1, border: '2px solid', borderColor: 'black', background: '#FFFFFF', width: 900}} 
        id="payment_method" name="payment_method" onChange={handleChange} label="Paypal/Venmo Username" variant="outlined" />
                    <TextField sx={{mt: 1, border: '2px solid', borderColor: 'black', background: '#FFFFFF', width: 900}} 
        id="thank_you_note" name="thank_you_note" onChange={handleChange} label="Thank You Note (optional):" variant="outlined" />
    <FormControlLabel sx={{mt: 5, width: 900}}control={<Checkbox />} label="I hereby confirm that all details entered are true as per my knowledge and BobaShare cannot be held responsible in case of any incorrect transactions incurred due to incorrect or falsified information " />
    <Button type="onSubmit" style={{
        backgroundColor: "#EDAB6F",
        width: '100px',
        marginTop: '5px'
    }} variant="contained" >Donate</Button>
                </form>
            </Container>
        </div>
        </ThemeProvider>
    );
  }