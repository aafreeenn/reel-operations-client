// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ({ userType, onTimeslotClick }) => {
  const navigate = useNavigate();

  const getCurrentSlot = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 14) return '7am';
    if (hour >= 14 && hour < 22) return '3pm';
    return '10pm';
  };

  // Temporarily make 3pm button always available
  const isSlotAvailable = (slot) => {
    if (slot === '3pm') return true; // Always available
    if (slot === '7am') return false; // Disabled
    if (slot === '10pm') return false; // Disabled
    return false;
  };

  const handleTimeslotClick = (slot) => {
    onTimeslotClick(slot);
    navigate(`/timeslot/${slot}`);
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
    </div>
  );
};

export default Home;