import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../styles/Card.css'
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const PLACEHOLDER_IMAGE = "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";

export default function EventCard({ event, manageEventView, deleteEvent }) {
    const progress = (event.currentMoney / event.goalAmount) * 100;
    console.log(event);

    return (
        <Card
            sx={{
                border: '1px solid black',
                height: { xs: '600px', sm: '550px' },
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.02)',
                },
            }}
        >
            <CardMedia
                component="img"
                height="200"
                image={event.imageUrl || PLACEHOLDER_IMAGE}
                alt={event.eventName}
                sx={{ objectFit: 'cover' }}
            />

            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {event.eventName}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Organized by: {Array.isArray(event.organizers) 
                        ? `${event.organizers.slice(0, 3).join(', ')}${event.organizers.length > 3 ? ' ...' : ''}`
                        : event.organizers}
                </Typography> 

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {event.description}
                </Typography>

                <Box sx={{ mt: 'auto' }}>
                    <Tooltip title={`Current Money: ${event.currentMoney}, Goal: ${event.goalAmount}`}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <LinearProgress
                                variant="determinate"
                                value={progress}
                                sx={{
                                    flex: 1,
                                    mr: 1,
                                    height: '20px',
                                    borderRadius: '20px',
                                    backgroundColor: 'white',
                                    '& .MuiLinearProgress-bar': {
                                        borderRadius: '20px',
                                        backgroundColor: 'green.500',
                                    }
                                }}
                            />
                            <Typography variant="body2">
                                {Math.round(progress)}%
                            </Typography>
                        </Box>
                    </Tooltip>

                    {!manageEventView ? (
                        <Link to={`${event._id}`} style={{ textDecoration: 'none' }}>
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{
                                    backgroundColor: 'primary.main',
                                    border: '1px solid black',
                                    color: 'black',
                                    '&:hover': {
                                        backgroundColor: 'primary.light',
                                    }
                                }}
                            >
                                View Event
                            </Button>
                        </Link>
                    ) : (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Link to={`EditEvent/${event._id}`} style={{ textDecoration: 'none', flex: 1 }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        backgroundColor: 'primary.main',
                                        border: '1px solid black',
                                        color: 'black',
                                        '&:hover': {
                                            backgroundColor: 'primary.light',
                                        }
                                    }}
                                >
                                    Edit Event
                                </Button>
                            </Link>
                            <Button
                                variant="contained"
                                onClick={() => deleteEvent(event._id)}
                                sx={{
                                    flex: 1,
                                    backgroundColor: 'primary.main',
                                    border: '1px solid black',
                                    color: 'black',
                                    '&:hover': {
                                        backgroundColor: 'primary.light',
                                    }
                                }}
                            >
                                Delete Event
                            </Button>
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}