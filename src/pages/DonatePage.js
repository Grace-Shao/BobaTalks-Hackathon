// import '../styles/CreateEventPage.css';
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
import {
    ApplePay,
    GooglePay, 
    CreditCard,
    PaymentForm
} from "react-square-web-payments-sdk";

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
            await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/events/donate/${id}`, data);
            console.log('Donation submitted');
        } catch (error) {
            console.error(error);
        }
    };

    // not doing anything with the other fields for now
    const handleChange = (event) => {
        setThankYouNote(event.target.value);
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
                    // onChange={() => handleCustom()}
                    placeholder='CUSTOM'
                color="custom"
                variant="outlined" 
              >
              </input>
                    </div>

                <TextField sx={{mt: 1, border: '2px solid', borderColor: 'black', background: '#FFFFFF', width: 900}} 
        id="thank_you_note" name="thank_you_note" onChange={handleChange} label="Thank You Note (optional):" variant="outlined" />

                    <PaymentForm
                        applicationId="sandbox-sq0idb-yMiA_9_FWwmrR72EsRDZ3A"
                        cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
                            console.log(token)
                            console.log(verifiedBuyer)
                        }}
                        createPaymentRequest={() => ({
                            countryCode: "US",
                            currencyCode: "USD",
                            total: {
                                amount: "1.00",
                                label: "Total",
                            },
                        })}
                        locationId="LTH8JVJVKBYEG"
                    >
                        <ApplePay />
                        <GooglePay />
                        <CreditCard
                        buttonProps={{
                            css: {
                            backgroundColor: "#771520",
                            fontSize: "14px",
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "#530f16",
                            },
                            },
                        }}
                        />
                    </PaymentForm>

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