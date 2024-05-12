import './App.css';
import EventsPage from './pages/EventsPage';
import CreateEventPage from './pages/CreateEventPage';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/EventsPage" element={<EventsPage/>}/>
        <Route path="/Event/:id" element={<EventsPage/>}/>
        <Route path="/CreateEventPage" element={<CreateEventPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
