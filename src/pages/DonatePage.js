// import '../styles/CreateEventPage.css';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import {
    PaymentForm,
    CreditCard
} from 'react-square-web-payments-sdk';

import theme from '../theme';

export default function DonatePage() {
    const { id } = useParams();
    const [donationAmount, setDonationAmount] = useState(7);
    const [anonymous, setAnonymous] = useState(false);
    const [thankYouNote, setThankYouNote] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [donateAmountError, setDonateAmountError] = useState('');
    const [paymentError, setPaymentError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleDonation = (amount) => {
        setDonateAmountError('');
        const numAmount = Number(amount);
        if (isNaN(numAmount)) {
            setDonateAmountError('Invalid donation amount');
            return;
        }
        if (numAmount <= 0) {
            setDonateAmountError('Donation amount must be greater than 0');
            return;
        }
        setDonationAmount(Math.round(numAmount * 100) / 100);
        return;
    }

    const cardTokenizeResponseReceived = async (token, buyer) => {
        await handlePaymentSubmit(token);
    };

    const createPaymentRequest = () => {
        return {
            countryCode: "CA",
            currencyCode: "CAD",
            total: {
                amount: (donationAmount || 0),
                label: "Total",
            },
        };
    };


    // Update submitDonation for Square
    const handlePaymentSubmit = async (token) => {
        setIsProcessing(true);
        setPaymentError(null);

        try {
            const data = {
                sourceId: token.token,
                donation_amount: donationAmount,
                thank_you_note: thankYouNote,
                anonymous: anonymous,
            };

            await axios.put(
                `${process.env.REACT_APP_API_ENDPOINT}/api/events/donate/${id}`,
                data,
                {
                    withCredentials: true
                }
            );

            // redirect to all events page
            setSuccess(true);
            setDonationAmount(7);
            setThankYouNote('');
            console.log('Donation submitted');
        } catch (error) {
            setPaymentError('Payment failed. Please try again.');
            console.error('Error:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    // not doing anything with the other fields for now
    const handleChange = (event) => {
        setThankYouNote(event.target.value);
    }

    return (
        <ThemeProvider theme={theme}>

            {isProcessing && (
                <CircularProgress
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1000
                    }}
                />
            )}

            <Container maxWidth="sm" sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: { xs: 4, sm: 6 },
                pb: { xs: 4, sm: 6 },
                minHeight: '100vh',
                gap: 2,
                opacity: isProcessing ? 0.5 : 1,
                pointerEvents: isProcessing ? 'none' : 'auto',
                position: 'relative'
            }}>
                {success && (
                    <Alert
                        severity="success"
                        sx={{ width: '100%', mb: 3 }}
                        onClose={() => setSuccess(false)}
                    >
                        Thank you for your donation!
                    </Alert>
                )}



                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    align="center"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: { xs: '1.75rem', sm: '2.125rem' }
                    }}
                >
                    Give the gift of Boba!
                </Typography>

                <Typography
                    variant="subtitle1"
                    gutterBottom
                    align="center"
                    sx={{
                        color: 'text.secondary',
                        fontSize: { xs: '1rem', sm: '1.1rem' }
                    }}
                >
                    Enter your donation amount.
                </Typography>

                <Typography
                    variant="subtitle2"
                    gutterBottom
                    align="center"
                    sx={{
                        mb: 4,
                        color: 'text.secondary',
                        fontSize: { xs: '0.8rem', sm: '0.9rem' }
                    }}
                >
                    All donation amounts are in CAD.
                </Typography>

                <form style={{ width: '100%' }}>
                    <Grid container spacing={2} sx={{ mb: { ms: 3, sm: 4 } }}>
                        <Grid item xs={6} sm={6}>
                            <Button
                                fullWidth
                                variant={donationAmount === 7 ? "contained" : "outlined"}
                                color="primary"
                                onClick={() => handleDonation(7)}
                                sx={{ height: '60px' }}
                            >
                                Give a boba ($7)
                            </Button>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <Button
                                fullWidth
                                variant={donationAmount === 1 ? "contained" : "outlined"}
                                color="primary"
                                onClick={() => handleDonation(1)}
                                sx={{ height: '60px' }}
                            >
                                $1
                            </Button>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <Button
                                fullWidth
                                variant={donationAmount === 5 ? "contained" : "outlined"}
                                color="primary"
                                onClick={() => handleDonation(5)}
                                sx={{ height: '60px' }}
                            >
                                $5
                            </Button>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <Button
                                fullWidth
                                variant={donationAmount === 10 ? "contained" : "outlined"}
                                color="primary"
                                onClick={() => handleDonation(10)}
                                sx={{ height: '60px' }}
                            >
                                $10
                            </Button>
                        </Grid>
                    </Grid>

                    <Typography
                        variant="body1"
                        align="center"
                        sx={{
                            mt: 4,
                            mb: 4,
                            position: 'relative',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                left: 0,
                                top: '50%',
                                width: '30%',
                                height: '1px',
                                backgroundColor: 'rgba(0, 0, 0, 0.2)'
                            },
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                right: 0,
                                top: '50%',
                                width: '30%',
                                height: '1px',
                                backgroundColor: 'rgba(0, 0, 0, 0.2)'
                            }
                        }}
                    >
                        Or enter an amount
                    </Typography>

                    <TextField
                        fullWidth
                        label="Enter amount"
                        type="number"
                        value={donationAmount || ""}
                        InputProps={{
                            startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                        }}
                        onChange={(e) => handleDonation(Number(e.target.value))}
                        sx={{ mb: 4 }}
                        inputProps={{
                            min: 0,
                            step: "0.01"
                        }}
                        error={!!donateAmountError}
                        helperText={donateAmountError}
                    />

                    <TextField
                        fullWidth
                        label="Thank You Note (Optional)"
                        multiline
                        rows={4}
                        value={thankYouNote}
                        onChange={(e) => setThankYouNote(e.target.value)}
                        sx={{ mb: 4 }}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={anonymous}
                                onChange={(e) => setAnonymous(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Make donation anonymous"
                        sx={{ mb: 4 }}
                    />

                    {donationAmount && donationAmount > 0 && (
                        <PaymentForm
                            applicationId={process.env.REACT_APP_SQUARE_APP_ID}
                            locationId="main"
                            cardTokenizeResponseReceived={cardTokenizeResponseReceived}
                            createPaymentRequest={createPaymentRequest}
                            styling={{
                                variables: {
                                    colorPrimary: theme.palette.primary.main,
                                    colorBackground: '#ffffff',
                                    fontFamily: theme.typography.fontFamily,
                                },
                                'button[type="submit"]': {
                                    backgroundColor: `${theme.palette.primary.main} !important`,
                                    color: '#ffffff !important',
                                    '&:hover': {
                                        backgroundColor: `${theme.palette.primary.dark} !important`,
                                    }
                                }
                            }}
                        >
                            <CreditCard />
                        </PaymentForm>
                    )}

                    {paymentError && (
                        <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
                            {paymentError}
                        </Typography>
                    )}
                </form>
            </Container>


        </ThemeProvider>
    );
}