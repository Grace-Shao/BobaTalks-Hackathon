import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const {user} = useAuth();

  if (user !== null) {
    return children
  } else {
    return <Navigate to="/SignIn" replace />
  }
};

export default ProtectedRoute;
