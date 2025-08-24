import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import Subpages from './pages/Subpages';
import FlipCards from './pages/FlipCards';

import PrivateRoute from './components/PrivateRoute';

function App() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) setAdmin({ token });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!admin ? <Login onLogin={setAdmin} /> : <Navigate to="/" />} />
        <Route path="/" element={<PrivateRoute admin={admin}><Dashboard onLogout={handleLogout} /></PrivateRoute>} />
        <Route path="/categories" element={<PrivateRoute admin={admin}><Categories /></PrivateRoute>} />
        <Route path="/subpages" element={<PrivateRoute admin={admin}><Subpages /></PrivateRoute>} />
        <Route path="/flipcards" element={<PrivateRoute admin={admin}><FlipCards /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
