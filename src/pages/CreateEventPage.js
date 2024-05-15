import '../styles/style.css';
import Navbar from '../components/Navbar';
import Container from '@mui/material/Container';

export default function CreateEventPage() {
    return (
        <div>
            <Navbar />
            <Container
                sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: { xs: 14, sm: 20 },
                pb: { xs: 8, sm: 12 },
                }}
            >
            <h1>RecieverPage</h1>
            <form>
                <label htmlFor="eventName">Event Name:</label>
                <input type="text" id="eventName" name="eventName" />

                <label htmlFor="eventDescription">Event Description:</label>
                <input type="text" id="eventDescription" name="eventDescription" />

                <label htmlFor="goalAmount">Goal Amount:</label>
                <input type="number" id="goalAmount" name="goalAmount" />

                <label htmlFor="numOfPeople">Number of People:</label>
                <input type="number" id="numOfPeople" name="numOfPeople" />
                
                <label htmlFor="uploadPhotos">Upload Photos:</label>
                <input type="file" id="uploadPhotos" name="uploadPhotos" accept="image/*" multiple />

                <button type="submit">Create Campaign</button>
            </form>
            </Container>
        </div>
    );
  }