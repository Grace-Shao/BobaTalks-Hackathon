import './App.css';
import EventsPage from './pages/EventsPage';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/EventsPage" element={<EventsPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
