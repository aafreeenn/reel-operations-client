import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Timeslot from './components/Timeslot';
import './App.css';

function App() {
  const [userEmail, setUserEmail] = useState('');

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            userEmail ? (
              <Navigate to="/home" replace />
            ) : (
              <Login onLogin={(email) => setUserEmail(email)} />
            )
          }
        />
        <Route
          path="/home"
          element={
            userEmail ? (
              <Home onTimeslotClick={(slot) => window.location.href = `/timeslot/${slot}`} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/timeslot/:timeslot"
          element={
            userEmail ? (
              <Timeslot userEmail={userEmail} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
