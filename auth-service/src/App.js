// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const isAuthenticated = () => {
    // Check if token exists in local storage
    return !!localStorage.getItem('token');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/protected"
          // element={isAuthenticated() ? <ProtectedRoute /> : <Navigate to="/login" />}
          element={<ProtectedRoute />}
        />
      </Routes>
    </Router>
  );
};

export default App;
