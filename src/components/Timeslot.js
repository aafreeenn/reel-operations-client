// src/components/Timeslot.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Timeslot.css';
import StatusPopup from './Status';

const activities = [
  "TDM POS", "TDM Internet", "TDM BaseKey",
  "DMM POS", "DMM Internet", "DMM BaseKey",
  "TSS POS", "TSS Internet", "TSS BaseKey",
  "GRANADA POS", "GRANADA Internet", "GRANADA BaseKey",
  "MARASSI POS", "MARASSI Internet", "MARASSI BaseKey"
];

const Timeslot = ({ timeslot, onBackClick, userType }) => {
  const navigate = useNavigate();
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState('');
  const [technicianName, setTechnicianName] = useState('');

  const handleStatusSelect = (activity, status) => {
    setSelectedStatuses(prev => ({
      ...prev,
      [activity]: status
    }));
  };

  const handleSubmit = async () => {
    if (!technicianName.trim()) {
      alert('Please enter your name');
      return;
    }

    if (Object.keys(selectedStatuses).length !== activities.length) {
      alert('Please select status for all activities');
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
          statuses: selectedStatuses,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit report');
      }

      alert('submitted report successfully!');
      setSelectedStatuses({});
      setTechnicianName('');
    } catch (error) {
      console.error('Error details:', error);
      alert('Error in submitting report: ' + error.message);
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
      a.download = 'report.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Error downloading report. Please try again.');
    }
  };

  const handleActivityClick = (activity) => {
    setCurrentActivity(activity);
    setIsPopupOpen(true);
  };

  const getStatusColor = (status) => {
    if (status === 'active') return '#4CAF50'; // Green
    if (status === 'inactive') return '#F44336'; // Red
    return '#6e1d9c'; // Purple
  };

  return (
    <div className="timeslot-container">
      <div className="timeslot-header">
        <div className="timeslot-title">
          <h1>{timeslot}</h1>
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
            onClick={() => handleActivityClick(activity)}
            className="activity-button"
            style={{
              backgroundColor: getStatusColor(selectedStatuses[activity]),
              borderColor: getStatusColor(selectedStatuses[activity]),
            }}
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
        <button 
          onClick={handleSubmit} 
          className="submit-btn"
          disabled={Object.keys(selectedStatuses).length !== activities.length}
        >
          Submit
        </button>
      </div>

      <StatusPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onStatusSelect={handleStatusSelect}
        activity={currentActivity}
      />
    </div>
  );
};

export default Timeslot;