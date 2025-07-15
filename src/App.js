// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Timeslot from './components/Timeslot';
import CurrentTime from './components/CurrentTime';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTimeslot, setCurrentTimeslot] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const handleTimeslotClick = (timeslot) => {
    setCurrentTimeslot(timeslot);
  };

  const handleBackClick = () => {
    setCurrentTimeslot(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setCurrentTimeslot(null);
  };

  return (
    <Router>
      <div className="app">
        <CurrentTime />
        <Routes>
          <Route path="/" element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/home" />} />
          <Route path="/home" element={isLoggedIn ? <Home onTimeslotClick={handleTimeslotClick} /> : <Navigate to="/" />} />
          <Route 
            path="/timeslot/:slot" 
            element={isLoggedIn ? (
              <Timeslot 
                timeslot={currentTimeslot} 
                onBackClick={handleBackClick}
                userEmail={userEmail}
              />
            ) : (
              <Navigate to="/" />
            )}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;