// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ({ userType, onTimeslotClick }) => {
  const navigate = useNavigate();

  const getCurrentSlot = () => {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const timeInMinutes = hour * 60 + minutes;

  if (timeInMinutes >= 390 && timeInMinutes < 480) return '7am';    
  if (timeInMinutes >= 870 && timeInMinutes < 960) return '3pm';    
  if (timeInMinutes >= 1290 && timeInMinutes < 1380) return '10pm'; 

  return null; 
};


  const handleTimeslotClick = (slot) => {
    onTimeslotClick(slot);
    navigate(`/timeslot/${slot}`);
  };

  const handleClearLogs = async () => {
    if (!window.confirm("Are you sure you want to delete logs older than 3 months?")) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/clear-logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to clear logs');
      }

      alert('Logs cleared successfully!');
    } catch (error) {
      alert('Error clearing logs: ' + error.message);
    }
  };

  const currentSlot = getCurrentSlot();

  return (
    <div className="home-container">
      <div className="header">
        <h1>Reel Technical Operations</h1>
        <p className="user-type">{userType.toUpperCase()}</p>
      </div>

      <div className="timeslots">
        <button
          onClick={() => handleTimeslotClick('7am')}
          className={`timeslot-btn ${currentSlot === '7am' ? 'highlighted' : ''} disabled`}
          disabled
        >
          7 AM
        </button>
        <button
          onClick={() => handleTimeslotClick('3pm')}
          className={`timeslot-btn ${currentSlot === '3pm' ? 'highlighted' : ''}`}
        >
          3 PM
        </button>
        <button
          onClick={() => handleTimeslotClick('10pm')}
          className={`timeslot-btn ${currentSlot === '10pm' ? 'highlighted' : ''} disabled`}
          disabled
        >
          10 PM
        </button>
      </div>

      {userType === 'admin' && (
        <div className="admin-tools">
          <button onClick={handleClearLogs} className="clear-logs-btn">
            Clear Logs Older Than 3 Months
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
