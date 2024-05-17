import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signup = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/users/signup', userData);
      login(response.data);  // Assuming the backend returns the user data after signup
    } catch (error) {
      console.error('Signup error:', error.response ? error.response.data : error.message);
    }
  }


  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));  // Save to local storage or cookie
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');  // Remove from local storage or cookie
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
