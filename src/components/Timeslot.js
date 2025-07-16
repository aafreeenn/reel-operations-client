// src/components/Timeslot.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Timeslot.css';

const activities = [
  "TDM POS", "TDM Internet", "TDM BaseKey",
  "DMM POS", "DMM Internet", "DMM BaseKey",
  "TSS POS", "TSS Internet", "TSS BaseKey",
  "GRANADA POS", "GRANADA Internet", "GRANADA BaseKey",
  "MARASSI POS", "MARASSI Internet", "MARASSI BaseKey"
];

const Timeslot = ({ timeslot, onBackClick, userType }) => {
  const navigate = useNavigate();
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [deselectedActivities, setDeselectedActivities] = useState([]);
  const [technicianName, setTechnicianName] = useState('');

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
    if (!technicianName.trim()) {
      alert('Please enter your name');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/mark-attendance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timeslot,
          userEmail: technicianName,
          selectedActivities,
        }),
      });

      if (response.ok) {
        alert('Attendance marked successfully!');
        onBackClick();
        navigate('/home');
      } else {
        alert('Failed to mark attendance. Please try again.');
      }
    } catch (error) {
      alert('Error marking attendance. Please try again.');
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/download-report`);
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'attendance_report.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
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
        <div className="action-buttons">
          <button onClick={handleDownload} className="download-btn">
            Download Report
          </button>
          <button onClick={() => { onBackClick(); navigate('/home'); }} className="back-btn">
            Back to Home
          </button>
        </div>
      </div>

      <div className="activity-grid">
        {activities.map((activity) => (
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

      <div className="name-input-container">
        <input
          type="text"
          placeholder="Enter Name"
          value={technicianName}
          onChange={(e) => setTechnicianName(e.target.value)}
          className="name-input"
          required
        />
      </div>

      <div className="submit-container">
        <button onClick={handleSubmit} className="submit-btn">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Timeslot;