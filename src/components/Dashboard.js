// Dashboard.js
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = ({ userEmail }) => {
  const [stats, setStats] = useState({
    today: 0,
    week: 0,
    completionRate: 0
  });

  useEffect(() => {
    // Fetch statistics from backend
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/statistics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userEmail })
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {userEmail}</h1>
        <p className="last-login">Last login: {new Date().toLocaleDateString()}</p>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Today's Activities</h3>
          <p>{stats.today}/15 Completed</p>
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ width: `${(stats.today / 15) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="stat-card">
          <h3>This Week</h3>
          <p>{stats.week}/75 Completed</p>
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ width: `${(stats.week / 75) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="stat-card">
          <h3>Completion Rate</h3>
          <p>{stats.completionRate}%</p>
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ width: `${stats.completionRate}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <Link to="/timeslot/7am" className="action-btn">7 AM</Link>
          <Link to="/timeslot/3pm" className="action-btn">3 PM</Link>
          <Link to="/timeslot/10pm" className="action-btn">10 PM</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;