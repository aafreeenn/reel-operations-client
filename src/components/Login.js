// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // if you have custom styling

const Login = () => {
  const [userType, setUserType] = useState("technician");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
        userType,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("userType", userType);
        navigate("/home");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h1>REEL TECHNICAL OPERATIONS</h1>
      <form onSubmit={handleSubmit}>
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="technician">Technician</option>
          <option value="admin">Admin</option>
        </select>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;



/*
// src/components/Login.js
import React, { useState } from 'react';
import './Login.css';
import Menu from './Menu';
const BASE_URL = process.env.REACT_APP_BACKEND_URL;



const Login = ({ userType, onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
      <div className="login-box">
        <div className="logo-container">
          <img src="reel-cinemas-logo.png" alt="Reel Technical Operations Logo" className="login-logo" />
          <h1 className="login-title">{userType.toUpperCase()}</h1>
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
*/