import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import ServicesPage from "./pages/ServicesPage";
import CategoryPage from "./pages/CategoryPage";
import Subpage from "./pages/Subpage";

import Signup from './pages/auth/Signup';
import OtpVerify from './pages/auth/OtpVerify';
import Login from './pages/auth/Login';
import PasswordReset from './pages/auth/PasswordReset';

import JoinAsTalent from './pages/JoinAsTalent';
import TeamUpRequest from './pages/TeamUpRequest';
import CategoryOverviewPage from './pages/CategoryOverviewPage';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleVerified = (jwtToken, userInfo) => {
    setToken(jwtToken);
    setUser(userInfo);
    localStorage.setItem('token', jwtToken);
    navigate('/dashboard');
  };

  const RequireAuth = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const RedirectIfAuth = ({ children }) => {
    if (token) {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  };

  const startAuthFlow = () => {
    if (token) {
      navigate('/join-as-talent');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage onJoinAsTalent={startAuthFlow} />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/categories" element={<CategoryPage />} />
         <Route path="/subpage/:slug" element={<Subpage />} />

        {/* Dynamic category overview page by slug */}
        <Route path="/category/:slug" element={<CategoryOverviewPage />} />

        <Route
          path="/login"
          element={
            <RedirectIfAuth>
              <Login onVerified={handleVerified} />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectIfAuth>
              <Signup />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/verify-otp"
          element={
            <RedirectIfAuth>
              <OtpVerify onVerified={handleVerified} />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/passwordreset"
          element={
            <RedirectIfAuth>
              <PasswordReset />
            </RedirectIfAuth>
          }
        />

        {/* Protect Join as Talent (login required) */}
        <Route
          path="/join-as-talent"
          element={
            <RequireAuth>
              <JoinAsTalent />
            </RequireAuth>
          }
        />
        {/* Team-Up Request is public */}
        <Route path="/team-up-request" element={<TeamUpRequest />} />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <div style={{ padding: 20 }}>
                <h1>Dashboard</h1>
                <p>Welcome, {user?.email || "User"}!</p>
                <button
                  onClick={() => {
                    setToken(null);
                    setUser(null);
                    localStorage.removeItem('token');
                    navigate('/');
                  }}
                >
                  Logout
                </button>
              </div>
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
