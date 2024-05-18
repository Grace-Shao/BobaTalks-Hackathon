import '../styles/style.css';
import Navbar from '../components/Navbar';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

const theme = createTheme({
    palette: {
      custom: {
        main: '#D3E9FF',
        light: '#D3E9FF',
        dark: '#D3E9FF',
        contrastText: '#D3E9FF',
      },
    },
  });

export default function CreateEventPage() {
    const [post, setPost] = useState({eventName: '', eventDescription: '', goalAmount: ''})
    const numberFields = ['goal_amount']; // add any other number fields here

    const createEvent = async (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/events', post)
            .then(response => {
                console.log(response.data);
                alert('Event successfully created!');

            })
            .catch(error => {
                console.error(error);
            });
    }


    const handleChange = (event) => {
        // form input element that the user is interacting with
        const {name, value} = event.target;
        setPost(prevPost => ({
            ...prevPost, 
            [name]: numberFields.includes(name) ? Number(value) : value
        }));
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
                    pt: { xs: 12, sm: 12 },
                    pb: { xs: 12, sm: 12 },
                    px: 0,
                    backgroundColor: '#D3E9FF',
                    height: '100vh',
                }}
            >
            <Typography sx={{fontFamily: "Poppins", padding: 2, color:'#021944', fontWeight: 'bold', textAlign: 'left'}} variant="h4" component="div">
        Event Details
        </Typography>
        <form onSubmit={createEvent}>
            <Grid container spacing={8}>
        <Grid item>
        <TextField sx={{marginLeft: 10, border: '2px solid', borderColor: 'black', background: '#FFFFFF', width: 450}} 
                id="event_name" name="event_name" onChange={handleChange} label="Title of Event" variant="outlined" />
        </Grid>
        <Grid item>
        <TextField sx={{marginRight: 10, border: '2px solid', borderColor: 'black', background: '#FFFFFF', width: 450, float:'right'}} 
                id="event_owner" name="event_owner" onChange={handleChange} label="Organization" variant="outlined" />
        </Grid>
        <Grid item>
        <TextField sx={{marginLeft: 10, mt: -5, border: '2px solid', borderColor: 'black', background: '#FFFFFF', width: 450}} 
                id="start_date" name="start_date" onChange={handleChange} label="Start Date (YYYY-MM-DD)" variant="outlined" />
        </Grid>
        <Grid item>
        <TextField sx={{marginRight: 10, mt: -5, border: '2px solid', borderColor: 'black', background: '#FFFFFF', width: 450, float:'right'}} 
                id="start_time" name="start_time"  onChange={handleChange} label="Start Time" variant="outlined" />
        </Grid>
        <Grid item>
        <TextField sx={{marginLeft: 10, mt: -5, border: '2px solid', borderColor: 'black', background: '#FFFFFF', width: 450}} 
                id="end_date" name="end_date" onChange={handleChange} label="End Date (YYYY-MM-DD)" variant="outlined" />
        </Grid>
        <Grid item>
        <TextField sx={{marginRight: 10, mt: -5, border: '2px solid', borderColor: 'black', background: '#FFFFFF', width: 450, float:'right'}} 
                id="end_time" name="end_time"  onChange={handleChange} label="End Time" variant="outlined" />
        </Grid>
        <Grid item>
        <TextField sx={{marginLeft: 10, mt: -5, border: '2px solid', borderColor: 'black', background: '#FFFFFF', width: 450, float:'right'}} 
                id="goal_amount" name="goal_amount" onChange={handleChange} label="Goal Amount" variant="outlined" />
        </Grid>
        <Grid item>
        <Grid item>
        <TextField sx={{marginLeft: 10, mt: -5, border: '2px solid', borderColor: 'black', background: '#FFFFFF', width: 450, float:'right'}} 
                id="img_url" name="img_url" onChange={handleChange} label="Image url" variant="outlined" />
        </Grid>
        <Grid item></Grid>
       
        <FormGroup>
        <FormControlLabel sx={{mt: -5}}control={<Checkbox />} label="Display Amount Raised" />
        </FormGroup>
        </Grid>
        </Grid>
        <Button type="onSubmit" style={{
        backgroundColor: "#EDAB6F",
        width: '100px',
        marginLeft: '49%'
    }} variant="contained" onSubmit={createEvent}>Create</Button>
     </form>

    
            </Container>
        </div>
        </ThemeProvider>
    );
  }