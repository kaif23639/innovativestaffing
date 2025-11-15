import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import Subpages from './pages/Subpages';
import FlipCards from './pages/FlipCards';
import AdminBlogPanel from './pages/AdminBlogPanel';
import PrivateRoute from './components/PrivateRoute';
import UserManagement from './pages/UserManagement';
import Subscriptions from './pages/Subscriptions';

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
        
        <Route 
          path="/" 
          element={
            <PrivateRoute admin={admin}>
              <Dashboard onLogout={handleLogout} />
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/categories" 
          element={
            <PrivateRoute admin={admin}>
              <Categories />
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/subpages" 
          element={
            <PrivateRoute admin={admin}>
              <Subpages />
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/flipcards" 
          element={
            <PrivateRoute admin={admin}>
              <FlipCards />
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/blogs" 
          element={
            <PrivateRoute admin={admin}>
              <AdminBlogPanel />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/manage-users" 
          element={
            <PrivateRoute admin={admin}>
              <UserManagement />
            </PrivateRoute>
          } 
        />

             <Route 
          path="/subscriptions" 
          element={
            <PrivateRoute admin={admin}>
              <Subscriptions/>
            </PrivateRoute>
          } 
        />
        
      </Routes>
    </Router>
  );
}

export default App;