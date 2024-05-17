import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React, { useState } from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    signup({ email, password });
    navigate('/');
  };

  return (
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
          height: '100vh',
        }}
      >
        <Card sx={{ minWidth: 275 }}>
      <CardContent sx={{textAlign: 'center'}}>
        <Typography sx={{ fontSize: 14}} color="text.secondary" gutterBottom>
          New User?
        </Typography>
        <Typography sx={{padding: 2}} variant="h4" component="div">
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
                <label sx={{padding: 2}}>Email</label>
                <input type="text" id="email" name="email"
                value={email} onChange={(e) => setEmail(e.target.value)} />

                <label sx={{padding: 2}}>Password</label>
                <input sx={{paddingTop: 2}} type="text" id="pw" name="pw" 
                value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <label sx={{padding: 2}}>Re-enter Password</label>
                <input sx={{paddingTop: 2}} type="text" id="pw" name="pw" 
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                color="primary"
                variant="contained"
                size="small"
                component="a"
                type="submit"
                sx={{padding: 2}}
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </form>
      </CardContent>
     
    </Card>
      </Container>
  );
}