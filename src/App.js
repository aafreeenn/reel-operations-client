import React, { useState } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import Timeslot from './components/Timeslot';
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

  return (
    <div className="app">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : !currentTimeslot ? (
        <Home onTimeslotClick={handleTimeslotClick} />
      ) : (
        <Timeslot 
          timeslot={currentTimeslot} 
          onBackClick={handleBackClick}
          userEmail={userEmail}
        />
      )}
    </div>
  );
}

export default App;