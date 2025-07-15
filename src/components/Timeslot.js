// src/components/Timeslot.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Timeslot.css';

const activities = [
  "TDM POS", "TDM Internet", "TDM BaseKey",
  "DMM POS", "DMM Internet", "DMM BaseKey",
  "TSS POS", "TSS Internet", "TSS BaseKey",
  "GRANADA POS", "GRANADA Internet", "GRANADA BaseKey",
  "MARASSI POS", "MARASSI Internet", "MARASSI BaseKey"
];

const Timeslot = ({ timeslot, onBackClick, userEmail }) => {
  const navigate = useNavigate();
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [deselectedActivities, setDeselectedActivities] = useState([]);

  const toggleActivity = (activity) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter(a => a !== activity));
      if (!deselectedActivities.includes(activity)) {
        setDeselectedActivities([...deselectedActivities, activity]);
      }
    } else if (deselectedActivities.includes(activity)) {
      setDeselectedActivities(deselectedActivities.filter(a => a !== activity));
      if (!selectedActivities.includes(activity)) {
        setSelectedActivities([...selectedActivities, activity]);
      }
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/mark-attendance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timeslot,
          userEmail,
          selectedActivities,
          deselectedActivities
        }),
      });

      if (response.ok) {
        alert('Attendance marked successfully!');
        onBackClick();
      } else {
        alert('Failed to mark attendance. Please try again.');
      }
    } catch (error) {
      alert('Error marking attendance. Please try again.');
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/download-report`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'attendance_report.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Error downloading report. Please try again.');
    }
  };

  return (
    <div className="timeslot-container">
      <div className="timeslot-header">
        <div>
          <h1>Mark Attendance</h1>
          <h2>{timeslot}</h2>
        </div>
        <button onClick={onBackClick} className="back-btn">
          Back to Home
        </button>
      </div>

      <div className="activity-grid">
        {activities.map((activity, index) => (
          <button
            key={activity}
            onClick={() => toggleActivity(activity)}
            className={`activity-button ${
              selectedActivities.includes(activity) ? 'selected' :
              deselectedActivities.includes(activity) ? 'deselected' : ''
            }`}
          >
            {activity}
          </button>
        ))}
      </div>

      <div className="action-buttons">
        <button onClick={handleDownload} className="download-btn">
          Download Report
        </button>
        <button onClick={handleSubmit} className="submit-btn">
          Submit Attendance
        </button>
      </div>
    </div>
  );
};

export default Timeslot;







/*
const activities = [
  "TDM POS", "TDM Internet", "TDM BaseKey",
  "DMM POS", "DMM Internet", "DMM BaseKey",
  "TSS POS", "TSS Internet", "TSS BaseKey",
  "GRANADA POS", "GRANADA Internet", "GRANADA BaseKey",
  "MARASSI POS", "MARASSI Internet", "MARASSI BaseKey"
];

*/ 