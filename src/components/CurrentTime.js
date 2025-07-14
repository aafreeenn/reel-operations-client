// src/components/CurrentTime.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentSlot, setCurrentSlot] = useState('');

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/get-current-time`);
        setCurrentTime(response.data.current_time);
        setCurrentSlot(response.data.current_slot);
      } catch (error) {
        console.error('Error fetching time:', error);
      }
    };

    // Fetch time immediately
    fetchTime();

    // Update time every second
    const timer = setInterval(fetchTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="current-time-container">
      <div className="time-display">
        <span className="time-label">Current Time:</span>
        <span className="time-value">{currentTime}</span>
      </div>
      <div className="slot-display">
        <span className="slot-label">Current Slot:</span>
        <span className="slot-value">{currentSlot}</span>
      </div>
    </div>
  );
};

export default CurrentTime;