// src/components/Status.js
import React, { useState } from 'react';
import './Status.css';

const StatusPopup = ({ isOpen, onClose, onStatusSelect, activity }) => {
  const [status, setStatus] = useState('');

  const handleSubmit = () => {
    if (status) {
      onStatusSelect(activity, status);
      onClose();
    }
  };

  return (
    <div className={`status-popup ${isOpen ? 'open' : ''}`}>
      <div className="popup-content">
        <h3>Select Status for {activity}</h3>
        <div className="status-options">
          <label>
            <input
              type="radio"
              name="status"
              value="active"
              checked={status === 'active'}
              onChange={() => setStatus('active')}
            />
            Active
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="inactive"
              checked={status === 'inactive'}
              onChange={() => setStatus('inactive')}
            />
            Inactive
          </label>
        </div>
        <div className="popup-buttons">
          <button onClick={onClose} className="cancel-btn">Cancel</button>
          <button onClick={handleSubmit} className="submit-btn">Save</button>
        </div>
      </div>
    </div>
  );
};

export default StatusPopup;

