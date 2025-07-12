import React from 'react';
import './Dashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <a href={`${process.env.REACT_APP_BACKEND_URL}/api/download`} className="download-btn">
        Download All Attendance Sheets
      </a>
    </div>
  );
};

export default AdminDashboard;
