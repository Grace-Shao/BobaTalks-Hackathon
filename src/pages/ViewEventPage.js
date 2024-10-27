import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Typography,
    Box,
    LinearProgress,
    Button,
    Divider,
} from '@mui/material';
import DonatePage from './DonatePage';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from '../theme';

const PLACEHOLDER_IMAGE = "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";

export default function ViewEventPage() {
    const [showDonate, setShowDonate] = useState(false);
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_ENDPOINT}/api/events/${id}`,
                    { withCredentials: true }
                );
                setEvent(response.data);
            } catch (error) {
                console.error('Error fetching event:', error);
            }
        };

        fetchEvent();
    }, [id]);

    if (!event) return null;

    const progress = (event.currentMoney / event.goalAmount) * 100;

    // Calculate days left
    const today = new Date();
    const endDate = new Date(event.endDate);
    const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            minHeight: '100vh',
            position: 'relative'
        }}>
            <Container
                maxWidth={false}
                sx={{
                    py: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: { xs: '100%', md: showDonate ? '50%' : '100%' },
                    height: '100%',
                    transition: 'width 0.3s ease',
                }}
            >
                <Container
                    maxWidth="md"
                    sx={{
                        py: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignContent: 'center',
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            mb: 4
                        }}
                    >
                        {event.eventName}
                    </Typography>

                    <Box
                        sx={{
                            position: 'relative',
                            p: '5px',
                            border: '2px solid black',
                            maxWidth: '50vw',
                            margin: '0 auto',
                            mb: 4,
                        }}
                    >
                        <Box
                            sx={{
                                border: '2px solid black',
                                overflow: 'hidden',
                            }}
                        >
                            <img
                                src={event.imageUrl || PLACEHOLDER_IMAGE}
                                alt={event.eventName}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                }}
                            />
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 2
                        }}
                    >
                        <Typography variant="h6">
                            {event.donators?.length || 0} Donators
                        </Typography>
                        <Typography variant="h6">
                            {daysLeft} Days Left
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                                height: 20,
                                borderRadius: 2,
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: 'primary.main',
                                }
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 4
                        }}
                    >
                        <Typography variant="h6">
                            Target: ${event.goalAmount}
                        </Typography>
                        <Typography variant="h6">
                            Raised: ${event.currentMoney}
                        </Typography>
                    </Box>

                    <Divider sx={{
                        mb: 4,
                        borderColor: 'black',
                        borderWidth: '1px'
                    }} />

                    <Typography
                        variant="body1"
                        sx={{
                            mb: 4,
                            whiteSpace: 'pre-line'  // This preserves line breaks in the description
                        }}
                    >
                        {event.description}
                    </Typography>

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() => setShowDonate(true)}
                        sx={{
                            backgroundColor: 'primary.main',
                            border: '2px solid black',
                            color: 'black',
                            fontWeight: 'bold',
                            py: 2,
                            fontSize: '1.2rem',
                            '&:hover': {
                                backgroundColor: 'primary.light',
                            }
                        }}
                    >
                        Donate Now
                    </Button>

                </Container>
            </Container>


            {/* Donate Section */}
            {showDonate && (
                <Container
                    sx={{
                        position: { xs: 'fixed', md: 'relative' },
                        bottom: 0,
                        right: 0,
                        width: { xs: '100%', md: '50%' },
                        height: { xs: '60%', md: '100%' },
                        backgroundColor: 'white',
                        boxShadow: { xs: '0px -4px 10px rgba(0, 0, 0, 0.1)', md: '-4px 0px 10px rgba(0, 0, 0, 0.1)' },
                        zIndex: 1000,
                        overflowY: 'auto',
                        transition: 'all 0.3s ease',
                        transform: showDonate ? 'translateY(0)' : 'translateY(100%)',
                    }}
                >
                    <Box
                        sx={{
                            position: 'sticky',
                            top: 0,
                            p: 1,
                            backgroundColor: 'white',
                            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                            justifyContent: 'flex-end'
                        }}
                    >
                        <Button
                            onClick={() => setShowDonate(false)}
                            sx={{ minWidth: 'auto' }}
                        >
                            X
                        </Button>
                    </Box>
                    <DonatePage />
                </Container>
            )}
        </Box>
    );
}