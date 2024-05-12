import { Link } from 'react-router-dom'
import '../styles/Card.css'
export default function EventCard() {
    return (
        <div className="card">
            <h1>EventCard</h1>
            <p>Event description</p>
            <p>Event goal amount</p>
            <p>num of People recieving boba</p>
            <Link to={`Event/:id`}>
                <button>Learn More</button>
            </Link>
        </div>
    );
}