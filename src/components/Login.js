import React, { useState } from 'react';
import './Login.css';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch(`${BASE_URL}/api/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'An error occurred');
        return;
      }
      
      if (data.success) {
        onLogin(email);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const toggleMode = () => {
    setMode(prev => prev === 'login' ? 'register' : 'login');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-container">
          <img src="reel-cinemas-logo.png" alt="Reel Technical Operations Logo" className="login-logo" />
          <h1 className="login-title">LOGIN</h1>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
          </div>
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
            {mode === 'login' ? 'Log In' : 'Register'}
          </button>
        </form>
        <button onClick={toggleMode} className="toggle-btn">
          {mode === 'login' ? 'Register New Account' : 'Back to Login'}
        </button>
      </div>
    </div>
  );
};

export default Login;
