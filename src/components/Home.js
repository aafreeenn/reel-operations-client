// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ onTimeslotClick, userType }) => {
  const navigate = useNavigate();

  const getCurrentSlot = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 14) return '7am';
    if (hour >= 14 && hour < 22) return '3pm';
    return '10pm';
  };

  const isSlotAvailable = (slot) => {
    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes();

    if (slot === '7am') return hour >= 7 && hour < 9;
    if (slot === '3pm') return hour >= 15 && hour < 17;
    if (slot === '10pm') return hour >= 22 && hour < 24;
    return false;
  };

  const handleTimeslotClick = (slot) => {
    if (!isSlotAvailable(slot)) {
      alert(`This timeslot is only available between ${slot} and ${slot === '7am' ? '8:30 AM' : slot === '3pm' ? '4:30 PM' : '11:30 PM'}`);
      return;
    }
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
      </div>

      <div className="timeslots">
        <button
          onClick={() => handleTimeslotClick('7am')}
          className={`timeslot-btn ${currentSlot === '7am' ? 'highlighted' : ''} ${!isSlotAvailable('7am') ? 'disabled' : ''}`}
          disabled={!isSlotAvailable('7am')}
        >
          7 AM
        </button>
        <button
          onClick={() => handleTimeslotClick('3pm')}
          className={`timeslot-btn ${currentSlot === '3pm' ? 'highlighted' : ''} ${!isSlotAvailable('3pm') ? 'disabled' : ''}`}
          disabled={!isSlotAvailable('3pm')}
        >
          3 PM
        </button>
        <button
          onClick={() => handleTimeslotClick('10pm')}
          className={`timeslot-btn ${currentSlot === '10pm' ? 'highlighted' : ''} ${!isSlotAvailable('10pm') ? 'disabled' : ''}`}
          disabled={!isSlotAvailable('10pm')}
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
