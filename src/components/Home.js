import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleTimeslotClick = (slot) => {
    navigate(`/timeslot/${slot}`);
  };

  return (
    <div className="home-container">
      <div className="header">
        <h1>Reel Technical Operations</h1>
      </div>
      <div className="timeslots">
        <button onClick={() => handleTimeslotClick('7am')} className="timeslot-btn">
          7 AM
        </button>
        <button onClick={() => handleTimeslotClick('3pm')} className="timeslot-btn">
          3 PM
        </button>
        <button onClick={() => handleTimeslotClick('10pm')} className="timeslot-btn">
          10 PM
        </button>
      </div>
    </div>
  );
};

export default Home;
