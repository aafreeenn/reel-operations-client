// src/components/Timeslot.js
import React, { useState } from 'react';
import axios from 'axios';
import './Timeslot.css';

const Timeslot = ({ timeslot, onBackClick, userEmail }) => {
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [deselectedActivities, setDeselectedActivities] = useState([]);

  const activities = [
  "TDM POS", "TDM Internet", "TDM BaseKey",
  "DMM POS", "DMM Internet", "DMM BaseKey",
  "TSS POS", "TSS Internet", "TSS BaseKey",
  "GRANADA POS", "GRANADA Internet", "GRANADA BaseKey",
  "MARASSI POS", "MARASSI Internet", "MARASSI BaseKey"
];

  const handleActivityClick = (activity) => {
    if (selectedActivities.includes(activity)) {
      // If activity is already selected, deselect it
      setSelectedActivities(prev => prev.filter(a => a !== activity));
      setDeselectedActivities(prev => [...prev, activity]);
    } else {
      // If activity is deselected, remove it from deselected list
      setDeselectedActivities(prev => prev.filter(a => a !== activity));
      setSelectedActivities(prev => [...prev, activity]);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/mark-attendance`, {
        timeslot,
        selected: selectedActivities,
        deselected: deselectedActivities,
        user: userEmail
      });
      onBackClick();
    } catch (error) {
      console.error('Error submitting attendance:', error);
    }
  };

  return (
    <div className="timeslot-container">
      <h1>Mark Attendance</h1>
      <div className="timeslot-header">
        <h2>Time Slot: {timeslot}</h2>
        <button className="back-button" onClick={onBackClick}>
          Back to Home
        </button>
      </div>
      
      <div className="activity-grid">
        {activities.map((activity, index) => (
          <button
            key={index}
            className={`activity-button ${
              selectedActivities.includes(activity) ? 'selected' : 
              deselectedActivities.includes(activity) ? 'deselected' : ''
            }`}
            onClick={() => handleActivityClick(activity)}
          >
            {activity}
          </button>
        ))}
      </div>

      <div className="action-buttons">
        <button className="submit-button" onClick={handleSubmit}>
          Submit Attendance
        </button>
        <button className="download-button" onClick={() => window.location.href = `${process.env.REACT_APP_API_URL}/api/download`}>
          Download Report
        </button>
      </div>
    </div>
  );
};

export default Timeslot;