import CreateEventForm from '../components/EventForm';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function CreateEventPage() {
    
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>
    }

    const submitCallback = async (formValues) => {
        try {
            let response = await axios.post(
                `${process.env.REACT_APP_API_ENDPOINT}/api/events/`, 
                {
                    ...formValues,
                    currentMoney: Number(formValues.currentMoney),
                    goalAmount: Number(formValues.goalAmount),
                })

            console.log('Event updated:', response.data);
            alert('Event successfully created!');
        } catch (error) {
            console.error('Failed to create event:', error);
        }
    }

    let initialFormValues = {
        currentMoney: '',
        goalAmount: '',
        eventName: '',
        organizers: [ user.email ], // Auto-add current user's email
        description: '',
        imageUrl: '',
    }


    return (
        <CreateEventForm initialFormValues={initialFormValues} currentUserEmail={user.email} submitCallback={submitCallback}/>
    )
  }
