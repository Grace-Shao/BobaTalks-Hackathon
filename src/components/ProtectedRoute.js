import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Placeholder for auth check. Replace `isLoggedIn` with your actual logic
  const isLoggedIn = localStorage.getItem('user') !== null; // Example: Check if user info exists in localStorage

  return isLoggedIn ? children : <Navigate to="/SignIn" replace />;
};

export default ProtectedRoute;
