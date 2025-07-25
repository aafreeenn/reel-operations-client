// src/components/Menu.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';

const Menu = ({ onLogout, currentTimeslot, currentTime }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Call the parent's logout function if provided
    if (onLogout) {
      onLogout();
    }
    // Navigate back to the login page
    navigate('/');
  };

  return (
    <div className="menu-container">
      <button 
        className="menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span className="menu-icon"></span>
      </button>

      {isOpen && (
        <div className="menu-content">
          <div className="menu-item">
            <span className="menu-label">Current Time:</span>
            <span className="menu-value">{currentTime}</span>
          </div>
          <div className="menu-item">
            <span className="menu-label">Current Slot:</span>
            <span className="menu-value">{currentTimeslot}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="logout-btn"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;