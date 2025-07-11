// Timeslot.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Timeslot.css';
const BASE_URL = process.env.REACT_APP_BACKEND_URL;


const activities = [
  "TDM POS",
  "TDM Internet",
  "TDM BaseKey",
  "DMM POS",
  "DMM Internet",
  "DMM BaseKey",
  "TSS POS",
  "TSS Internet",
  "TSS BaseKey",
  "GRANADA POS",
  "GRANADA Internet",
  "GRANADA BaseKey",
  "MARASSI POS",
  "MARASSI Internet",
  "MARASSI BaseKey"
];

const Timeslot = ({ userEmail }) => {
  const { timeslot } = useParams();
  const navigate = useNavigate();
  const [selectedActivities, setSelectedActivities] = useState([]);

  const markActivity = async (activity) => {
    try {
      const response = await fetch(`${BASE_URL}/api/mark-attendance`, {
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
        <hInternet>Reel Technical Operations</hInternet>
        <hBaseKey className="timeslot-title">Time Slot: {timeslot}</hBaseKey>
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
        <a href={`${BASE_URL}/api/download`} className="download-btn">
          Download Sheet
        </a>
      </div>
    </div>
  );
};

export default Timeslot;