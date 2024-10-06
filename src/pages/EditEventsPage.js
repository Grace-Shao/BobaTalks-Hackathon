import '../styles/style.css';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { useAuth } from '../context/AuthContext';

export default function EditEventPage() {
    const [post, setPost] = useState()
    const res = useParams();
    const {user} = useAuth();
    console.log(post)

    const eventId = res.id;

    const numberFields = ['goal_amount']; // add any other number fields here

    useEffect(() => {
      if (!eventId || !user || !user.email) return;

      console.log(eventId, user.email)
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/events/${eventId}`, {
          params: { username: user.email }
        })
        .then(response => {
            const {
                goal_amount,
                event_name,
                event_owner,
                event_description,
                end_date,
                start_date,
                img_url
            } = response.data

            const event = {
                goal_amount,
                event_name,
                event_owner,
                event_description,
                end_date: new Date(end_date).toISOString().substring(0, 10),
                start_date: new Date(start_date).toISOString().substring(0, 10),
                img_url
            }

            setPost(event);
        })
        .catch(error => {
            console.error(error);
        });
    }, [eventId, user]);

    const editEvent = async (event) => {
        event.preventDefault();
        axios.put(`${process.env.REACT_APP_API_ENDPOINT}/events/${eventId}`, post)
            .then(response => {
              console.log('Event updated:', response.data);
              alert('Event successfully updated!');
          })
          .catch(error => {
              console.error('Failed to update event:', error);
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
        <div>
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
        Edit Event Details
        </Typography>
        <form onSubmit={editEvent}>
        <Grid container spacing={8}>
        <Grid item>
        <TextField sx={{marginLeft: 10, border: '2px solid', borderColor: 'black', background: '#FFFFFF', width: 450}}
                id="event_name" name="event_name" value={post ? post.event_name : ''} onChange={handleChange} label="Title of Event" variant="outlined" />
        </Grid>
        <Grid item>
        <TextField sx={{marginRight: 10, border: '2px solid', borderColor: 'black', background: '#FFFFFF', width: 450, float:'right'}}
                id="event_owner" name="event_owner" value={post ? post.event_owner : ''}onChange={handleChange} label="Organization" variant="outlined" />
        </Grid>
        <Grid item>
        <TextField sx={{marginLeft: 10, mt: -5, border: '2px solid', borderColor: 'black', background: '#FFFFFF', width: 450}}
                id="start_date" name="start_date" value={post ? post.start_date : ''} onChange={handleChange} label="Start Date (YYYY-MM-DD)" variant="outlined" />
        </Grid>
        <Grid item>
        <TextField sx={{marginRight: 10, mt: -5, border: '2px solid', borderColor: 'black', background: '#FFFFFF', width: 450, float:'right'}}
                id="event_description" name="event_description"  value={post ? post.event_description : ''} onChange={handleChange} label="Event Description" variant="outlined" />
        </Grid>
        <Grid item>
        <TextField sx={{marginLeft: 10, mt: -5, border: '2px solid', borderColor: 'black', background: '#FFFFFF', width: 450}}
                id="end_date" name="end_date" value={post ? post.end_date : ''} onChange={handleChange} label="End Date (YYYY-MM-DD)" variant="outlined" />
        </Grid>
        <Grid item>
        <TextField sx={{marginRight: 10, mt: -5, border: '2px solid', borderColor: 'black', background: '#FFFFFF', width: 450, float:'right'}}
                id="image_url" name="image_url"  value={post ? post.image_url : ''}onChange={handleChange} label="Image URL" variant="outlined" />
        </Grid>
        <Grid item>
        <TextField sx={{marginLeft: 10, mt: -5, border: '2px solid', borderColor: 'black', background: '#FFFFFF', width: 450, float:'right'}}
                id="goal_amount" name="goal_amount" value={post ? post.goal_amount : ''} onChange={handleChange} label="Goal Amount" variant="outlined" />
        </Grid>
        <Grid item>
        <FormGroup>
        <FormControlLabel sx={{mt: -5}}control={<Checkbox />} label="Display Amount Raised" />
        </FormGroup>
        </Grid>
        </Grid>
        <Button type="onSubmit" style={{
        backgroundColor: "#EDAB6F",
        width: '100px',
        marginLeft: '10%',
        marginTop: '2%'
    }} variant="contained" onSubmit={editEvent}>Save Changes</Button>
     </form>


            </Container>
        </div>
    );
  }
