import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Timeslot.css';

const activities = [
  "TDM POS", "TDM Internet", "TDM BaseKey",
  "DMM POS", "DMM Internet", "DMM BaseKey",
  "TSS POS", "TSS Internet", "TSS BaseKey",
  "GRANADA POS", "GRANADA Internet", "GRANADA BaseKey",
  "MARASSI POS", "MARASSI Internet", "MARASSI BaseKey"
];

const Timeslot = ({ userEmail }) => {
  const { timeslot } = useParams();
  const navigate = useNavigate();
  const [selectedActivities, setSelectedActivities] = useState([]);

  const markActivity = async (activity) => {
    const alreadySelected = selectedActivities.includes(activity);
    const newSelected = alreadySelected
      ? selectedActivities.filter(a => a !== activity)
      : [...selectedActivities, activity];

    setSelectedActivities(newSelected);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/mark-attendance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          activity, 
          timeslot,
          user: userEmail,
          selected: !alreadySelected
        }),
      });
    } catch (error) {
      console.error('Error marking activity:', error);
    }
  };

  const handleBackClick = async () => {
  const unselectedActivities = activities.filter(activity => !selectedActivities.includes(activity));

  try {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/unselected`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timeslot,
        user: userEmail,
        unselected: unselectedActivities
      }),
    });
  } catch (error) {
    console.error('Error sending unselected activities:', error);
  }


    navigate('/home');
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
        <a href={`${process.env.REACT_APP_BACKEND_URL}/api/download`} className="download-btn">
          Download Sheet
        </a>
      </div>
    </div>
  );
};

export default Timeslot;
