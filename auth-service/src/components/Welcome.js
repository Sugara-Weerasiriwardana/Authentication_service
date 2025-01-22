import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Welcome.css';  // Assuming you're using an external CSS file named 'Welcome.css'

function Welcome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');  // Redirect to the login page
  };

  return (
    <div className="welcome-container">
      <h2 className="welcome-header">Welcome to Our Service</h2>
      <div className="button-container">
        <Link to="/login">
          <button className="welcome-button">Login</button>
        </Link>

        <button className="welcome-button" onClick={() => window.location.href = "http://localhost:9090"}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
            alt="Microsoft Logo"
            style={{ width: '20px', height: '20px', marginRight: '5px' }}
          />
          Login
        </button>
        <Link to="/register">
          <button className="welcome-button">Register</button>
        </Link>
        <Link to="/protected">
          <button className="welcome-button">Protected</button>
        </Link>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </div>
  );
}

export default Welcome;
