// src/components/ProtectedRoute.js
import React, { useState } from 'react';
import axios from 'axios';
import './ProtectedRoute.css';  // Assuming you're using an external CSS file named 'ProtectedRoute.css'

const ProtectedRoute = () => {
  const [message, setMessage] = useState('');

  // const handleAccessProtectedRoute = () => {
  //   const token = localStorage.getItem('token'); // Retrieve the token from local storage

  //   axios.get('http://localhost:4000/protected', {
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   })
  //   .then(response => {
  //     setMessage(response.data.message);
  //   })
  //   .catch(error => {
  //     setMessage("Access denied!");
  //     console.error(error.response ? error.response.data : error.message);
  //   });
  // };
  const handleAccessProtectedRoute = () => {
    let token = localStorage.getItem('token'); // Retrieve the token from local storage

    if (!token) {

      axios.post('http://localhost:9090/api/token')
        .then(response => {
          token = response.data.token;
          console.log('token' + token)
          if (token.startsWith('Bearer')) {
            localStorage.setItem('token', token);
            axios.get('http://localhost:4000/protected', {
              headers: {
                'Authorization': `${token + "MIS"}`
              }
            })
              .then(response => {
                setMessage(response.data.message);
              })
              .catch(error => {
                setMessage("Access denied!");
                console.error(error.response ? error.response.data : error.message);
              });
          } else {
            setMessage("Access denied!");
          }

        })
        .catch(error => {
          setMessage("Failed to get token!");
          console.error(error.response ? error.response.data : error.message);
        });
    } else {
      console.log(token);
      axios.get('http://localhost:4000/protected', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          setMessage(response.data.message);
        })
        .catch(error => {
          setMessage("Access denied!");
          console.error(error.response ? error.response.data : error.message);
        });
    }
  };


  return (
    <div className="protected-route-container">
      <button onClick={handleAccessProtectedRoute} className="protected-route-button">
        Access Protected Route
      </button>
      {message && <p className="protected-route-message">{message}</p>}
    </div>
  );
};

export default ProtectedRoute;
