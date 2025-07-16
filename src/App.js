// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserTypeSelection from './components/UserTypeSelection';
import Login from './components/Login';
import Home from './components/Home';
import Timeslot from './components/Timeslot';
//import CurrentTime from './components/CurrentTime';
import Menu from './components/Menu';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTimeslot, setCurrentTimeslot] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time and timeslot every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setCurrentTimeslot(getCurrentSlot(now));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getCurrentSlot = (date) => {
    const hour = date.getHours();
    const minute = date.getMinutes();
    
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

  const handleUserTypeSelect = (type) => {
    setUserType(type);
  };

  const handleLogin = (type) => {
    setIsLoggedIn(true);
    setUserType(type);
  };

  const handleTimeslotClick = (timeslot) => {
    setCurrentTimeslot(timeslot);
  };

  const handleBackClick = () => {
    setCurrentTimeslot(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setUserEmail('');
    setCurrentTimeslot(null);
  };

  return (
    <Router>
      <div className="app">
        {/* Add the Menu component */}
        {isLoggedIn && (
          <Menu 
            onLogout={handleLogout} 
            currentTimeslot={currentTimeslot}
            currentTime={currentTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true
            })}
          />
        )}

        <Routes>
          <Route path="/" element={
            !isLoggedIn ? (
              !userType ? (
                <UserTypeSelection onUserTypeSelect={handleUserTypeSelect} />
              ) : (
                <Login userType={userType} onLogin={handleLogin} />
              )
            ) : (
              <Navigate to="/home" />
            )
          } />
          <Route path="/home" element={
            isLoggedIn ? (
              <Home 
                onTimeslotClick={handleTimeslotClick} 
                userType={userType}
              />
            ) : (
              <Navigate to="/" />
            )
          } />
          <Route 
            path="/timeslot/:slot" 
            element={
              isLoggedIn ? (
                <Timeslot 
                  timeslot={currentTimeslot} 
                  onBackClick={handleBackClick}
                  userType={userType}
                  userEmail={userEmail}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;