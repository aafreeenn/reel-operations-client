// src/components/UserTypeSelection.js
import React from 'react';
import './UserTypeSelection.css';
import Menu from './Menu';

const UserTypeSelection = ({ onUserTypeSelect }) => {
  const handleLogout = () => {
    // Add any logout logic here if needed
  };

  return (
    <div className="user-type-container">
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
      <div className="user-type-box">
        <div className="logo-container">
          <h1 className="company-title">Reel Technical Operations</h1>
          <img src="reel-cinemas-logo.png" alt="Reel Technical Operations Logo" className="login-logo" />
          <h2 className="login-title">LOGIN</h2>
        </div>
        <div className="user-type-buttons">
          <button 
            onClick={() => onUserTypeSelect('admin')}
            className="user-type-btn admin-btn"
          >
            ADMIN
          </button>
          <button 
            onClick={() => onUserTypeSelect('technician')}
            className="user-type-btn tech-btn"
          >
            TECHNICIAN
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;