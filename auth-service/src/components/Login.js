import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';  // Assuming you're using an external CSS file named 'Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/login', { email, password })
      .then(response => {
        const { token } = response.data;
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        setMessage("Login successful!");
      })
      .catch(error => {
        setMessage("Login failed!");
        console.error(error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setMessage("Logged out successfully!");
  };

  const goToWelcomePage = () => {
    navigate('/');  // Navigate to the welcome page
  };

  return (
    <div className="login-container">
      {!isAuthenticated ? (
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="login-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
        </form>
      ) : (
        <>
          <button onClick={handleLogout} className="logout-button">Logout</button>
          <button onClick={goToWelcomePage} className="welcome-button">Go Back to Welcome Page</button>
        </>
      )}
      {message && <p className="login-message">{message}</p>}
    </div>
  );
};

export default Login;
