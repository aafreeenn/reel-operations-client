// src/components/Login.js
import React, { useState } from 'react';
import './Login.css';
import Menu from './Menu';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const Login = ({ userType, onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogout = () => {
    // Add any logout logic here if needed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userType, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Invalid password');
        return;
      }
      
      if (data.success) {
        onLogin(data.userType);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <Menu 
        onLogout={handleLogout} 
        currentTimeslot="Outside Working Hours"
        currentTime={new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })}
      />
      <div className="login-box">
        <div className="logo-container">
          <h1 className="company-title">Reel Technical Operations</h1>
          <img src="reel-cinemas-logo.png" alt="Reel Technical Operations Logo" className="login-logo" />
          <h2 className="login-title">{userType.toUpperCase()}</h2>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;