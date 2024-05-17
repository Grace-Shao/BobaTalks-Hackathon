import './App.css';
import EventsPage from './pages/EventsPage';
import CreateEventPage from './pages/CreateEventPage';
import Home from './pages/Home';
import DonatePage from './pages/DonatePage';
import BobaVendorsPage from './pages/BobaVendorsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/EventsPage" element={<EventsPage/>}/>
        <Route path="/EventsPage/DonatePage/:id" element={<DonatePage/>}/>
        <Route path="/CreateEventPage" element={<CreateEventPage/>}/>
        <Route path="/BobaVendorsPage" element={<BobaVendorsPage/>}/>
        <Route path="/SignIn" element={<SignIn/>}/>
        <Route path="/SignUp" element={<SignUp/>}/>
      </Routes>
    </Router>
  );
}

export default App;
