import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../styles/Card.css'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function VendorCard({ event }) {
    return (
        <Card
            sx={{
                maxWidth: 345,
                border: '1px solid black',
                borderRadius: 2,
                m: 2
            }}
        >
            <CardMedia
                component="img"
                height="200"
                image={event.imageUrl}
                alt={event.vendor_name}
            />
            <CardContent>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    gap: 2,
                    alignItems: 'start'
                }}>
                    {/* Left Column */}
                    <Box>
                        <Typography variant="h6" component="div" sx={{ fontSize: '1.1rem', mb: 1 }}>
                            {event.vendor_name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                {event.location}
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                            {event.specialty}
                        </Typography>
                    </Box>

                    {/* Right Column */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Button
                            component={Link}
                            to={`/vendor/${event.id}`}
                            variant="outlined"
                            size="small"
                            sx={{
                                fontSize: '0.7rem',
                                backgroundColor: '#FFA500',
                                color: 'black',
                                borderColor: 'black',
                                '&:hover': {
                                    backgroundColor: '#FFD580',
                                    borderColor: 'black',
                                }
                            }}
                        >
                            Learn More
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}