import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const getCurrentSlot = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 14) return '7am';
    if (hour >= 14 && hour < 22) return '3pm';
    return '10pm';
  };

  const currentSlot = getCurrentSlot();

  const handleTimeslotClick = (slot) => {
    navigate(`/timeslot/${slot}`);
  };

  return (
    <div className="home-container">
      <div className="header">
        <h1>Reel Technical Operations</h1>
      </div>
      <div className="timeslots">
        <button
          onClick={() => handleTimeslotClick('7am')}
          className={`timeslot-btn ${currentSlot === '7am' ? 'highlighted' : ''}`} >
          7 AM
        </button>
        <button
          onClick={() => handleTimeslotClick('3pm')}
          className={`timeslot-btn ${currentSlot === '3pm' ? 'highlighted' : ''}`} >
          3 PM
        </button>
        <button
          onClick={() => handleTimeslotClick('10pm')}
          className={`timeslot-btn ${currentSlot === '10pm' ? 'highlighted' : ''}`} >
          10 PM
        </button>
      </div>
    </div>
  );
};

export default Home;
