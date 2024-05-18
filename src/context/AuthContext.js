import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signup = async (userData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/users/signup`, userData);
      login(userData); 
    } catch (error) {
      console.error('Signup error:', error.response ? error.response.data : error.message);
    }
  }


  const login = async (credentials) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/users/login`, credentials);
      
      if (response.status === 200) {
        let userData = { email: credentials.email }
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData));  // Save to local storage, can probably replace with cookie
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
    }
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
