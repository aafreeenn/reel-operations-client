// src/components/UserTypeSelection.js
import React from 'react';
import './UserTypeSelection.css';

const UserTypeSelection = ({ onUserTypeSelect }) => {
  return (
    <div className="user-type-container">
      <div className="user-type-box">
        <div className="logo-container">
          <img src="reel-cinemas-logo.png" alt="Reel Technical Operations Logo" className="login-logo" />
          <h1 className="login-title">LOGIN</h1>
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