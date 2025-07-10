// Timeslot.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Timeslot.css';

const activities = [
  "TDM 1",
  "TDM 2",
  "TDM 3",
  "DMM 1",
  "DMM 2",
  "DMM 3",
  "TSS 1",
  "TSS 2",
  "TSS 3",
  "GRANADA 1",
  "GRANADA 2",
  "GRANADA 3",
  "MARASSI 1",
  "MARASSI 2",
  "MARASSI 3"
];

const Timeslot = ({ userEmail }) => {
  const { timeslot } = useParams();
  const navigate = useNavigate();
  const [selectedActivities, setSelectedActivities] = useState([]);

  const markActivity = async (activity) => {
    try {
      const response = await fetch('http://localhost:5001/api/mark-attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          activity, 
          timeslot,
          user: userEmail 
        }),
      });
      const data = await response.json();
      if (data.success) {
        setSelectedActivities(prev => [...prev, activity]);
      }
    } catch (error) {
      console.error('Error marking activity:', error);
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="timeslot-container">
      <div className="header">
        <h2>Reel Technical Operations</h2>
        <h3 className="timeslot-title">Time Slot: {timeslot}</h3>
        <h4 className="user-email">User: {userEmail}</h4>
      </div>
      <div className="timeslot-buttons">
        {activities.map((activity, index) => (
          <button
            key={index}
            onClick={() => markActivity(activity)}
            className={`activity-btn ${selectedActivities.includes(activity) ? 'selected' : ''}`}
          >
            {activity}
          </button>
        ))}
      </div>
      <div className="action-buttons">
        <button onClick={handleBackClick} className="back-btn">
          Back to Homepage
        </button>
        <a href="http://localhost:5001/api/download" className="download-btn">
          Download Sheet
        </a>
      </div>
    </div>
  );
};

export default Timeslot;