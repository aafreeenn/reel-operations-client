import React, { useEffect, useState, useRef } from 'react';
import './CurrentTime.css';

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentSlot, setCurrentSlot] = useState('');
  const [position, setPosition] = useState({ top: 20, right: 20 });
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

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

  // Drag handlers for desktop
  const onMouseDown = (e) => {
    dragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    e.preventDefault();
  };

  const onMouseMove = (e) => {
    if (!dragging.current) return;
    e.preventDefault();
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPosition(pos => ({
      top: Math.max(pos.top + dy, 0),
      right: Math.max(pos.right - dx, 0)
    }));
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp = () => {
    dragging.current = false;
  };

  // Drag handlers for touch devices
  const onTouchStart = (e) => {
    const touch = e.touches[0];
    dragging.current = true;
    dragStart.current = { x: touch.clientX, y: touch.clientY };
    e.preventDefault();
  };

  const onTouchMove = (e) => {
    if (!dragging.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStart.current.x;
    const dy = touch.clientY - dragStart.current.y;
    setPosition(pos => ({
      top: Math.max(pos.top + dy, 0),
      right: Math.max(pos.right - dx, 0)
    }));
    dragStart.current = { x: touch.clientX, y: touch.clientY };
    e.preventDefault();
  };

  const onTouchEnd = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="current-time-container"
      style={{ top: position.top, right: position.right, position: 'fixed', cursor: 'move', userSelect: 'none' }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
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
