// src/components/CurrentTime.js
import React, { useEffect, useState } from 'react';
import './CurrentTime.css';

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentSlot, setCurrentSlot] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setCurrentSlot(getCurrentSlot(now));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getCurrentSlot = (date) => {
    const hour = date.getHours();
    const minute = date.getMinutes();
    
    // Adjust timeslot boundaries to be more precise
    if (hour === 6 || (hour === 7 && minute < 30)) {
      return '7 AM';
    } else if (hour === 14 || (hour === 15 && minute < 30)) {
      return '3 PM';
    } else if (hour === 22 || (hour === 23 && minute < 30)) {
      return '10 PM';
    } else if (hour >= 7 && hour < 14) {
      return '7 AM';
    } else if (hour >= 15 && hour < 22) {
      return '3 PM';
    } else if (hour >= 23 || hour < 6) {
      return '10 PM';
    }
    return 'Outside Working Hours';
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
    <div className="current-time-container fixed-top-right">
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