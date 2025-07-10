import React from 'react';
import './Home.css';

const Home = ({ onTimeslotClick }) => {
  return (
    <div className="home-container">
      <div className="header">
        <h1>Reel Technical Operations</h1>
      </div>
      <div className="timeslots">
        <button onClick={() => onTimeslotClick('7am')} className="timeslot-btn">
          7 AM
        </button>
        <button onClick={() => onTimeslotClick('3pm')} className="timeslot-btn">
          3 PM
        </button>
        <button onClick={() => onTimeslotClick('10pm')} className="timeslot-btn">
          10 PM
        </button>
      </div>
    </div>
  );
};

export default Home;