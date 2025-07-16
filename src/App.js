// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserTypeSelection from './components/UserTypeSelection';
import Login from './components/Login';
import Home from './components/Home';
import Timeslot from './components/Timeslot';
import CurrentTime from './components/CurrentTime';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTimeslot, setCurrentTimeslot] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userEmail, setUserEmail] = useState('');

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
        <CurrentTime />
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