import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import '../styles/style.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';


export default function SignInForm() {
  const theme = useTheme();

  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(formData);
      navigate('/');
    } catch (error) {
      // Add error handling logic here, like displaying an error message
      console.error('Login failed:', error);
    }
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    pt: { xs: 11, sm: 11 },
    pb: { xs: 8, sm: 12 },
    maxWidth: 0,
    width: '100%',
    bgcolor: '#EDAB6F',
    minHeight: '100vh',
  };

  const textFieldStyles = {
    mt: 1,
    border: '2px solid',
    borderColor: 'black',
    background: '#FFFFFF',
    width: 500,
  };

  return (
    <Container className="width-no-space" disableGutters sx={containerStyles}>
      <span className="circle"></span>
      <Typography
        sx={{ fontFamily: 'Poppins', padding: 2, color: '#021944', fontWeight: 'bold' }}
        variant="h4"
        component="div"
      >
        Enter account details
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          sx={textFieldStyles}
          id="email"
          label="Email Address"
          name="email"
          type="email"
          variant="outlined"
          value={formData.email}
          onChange={handleInputChange}
        />
        <TextField
          sx={textFieldStyles}
          id="password"
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          value={formData.password}
          onChange={handleInputChange}
        />
        <Button sx={{ mt: 1 }} color="primary" variant="outlined" type="submit">
          Login
        </Button>
      </form>
    </Container>
  );
}
