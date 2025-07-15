import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
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
        {!isLoggedIn ? (
          <Login onLogin={handleLogin} />
        ) : !currentTimeslot ? (
          <div className="home-wrapper">
            <Home onTimeslotClick={handleTimeslotClick} />
            <button 
              onClick={handleLogout} 
              className="logout-btn"
            >
              Logout
            </button>
          </div>
        ) : (
          <Timeslot 
            timeslot={currentTimeslot} 
            onBackClick={handleBackClick}
            userEmail={userEmail}
          />
        )}
      </div>
    </Router>
  );
}

export default App;