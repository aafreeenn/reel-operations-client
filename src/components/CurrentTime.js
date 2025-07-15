// src/components/CurrentTime.js
import React, { useEffect, useState } from 'react';
import './CurrentTime.css';

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentSlot, setCurrentSlot] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setCurrentSlot(getCurrentSlot());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const getCurrentSlot = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 14) return '7 AM';
    if (hour >= 14 && hour < 22) return '3 PM';
    return '10 PM';
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="current-time-container">
      <div className="time-display">
        <span className="time-label">Current Time:</span>
        <span className="time-value">{formatTime(currentTime)}</span>
      </div>
      <div className="slot-display">
        <span className="slot-label">Current Slot:</span>
        <span className="slot-value">{currentSlot}</span>
      </div>
    </div>
  );
};

export default CurrentTime;