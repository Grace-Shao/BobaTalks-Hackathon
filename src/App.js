import "./App.css";
import EventsPage from "./pages/EventsPage";
import CreateEventPage from "./pages/CreateEventPage";
import Home from "./pages/Home";
import DonatePage from "./pages/DonatePage";
import BobaVendorsPage from "./pages/BobaVendorsPage";
import ManageEventPage from "./pages/ManageEventPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/EventsPage"
            element={
              <ProtectedRoute>
                <EventsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/EventsPage/DonatePage/:id"
            element={
              <ProtectedRoute>
                <DonatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/CreateEventPage"
            element={
              <ProtectedRoute>
                <CreateEventPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/BobaVendorsPage"
            element={
              <ProtectedRoute>
                <BobaVendorsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ManageEventPage"
            element={
              <ProtectedRoute>
                <ManageEventPage />
              </ProtectedRoute>
            }
          />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
