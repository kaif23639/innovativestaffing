// src/components/Auth/SetNewPassword.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api';

export default function SetNewPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, otp } = location.state || {}; // Read email and OTP from state

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!email || !otp) {
    return <p className="text-white text-center mt-10">Invalid session. Please start over.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await api.post('/api/users/password-reset/reset', {
        email,
        otp,
        password,
        confirmPassword,
      });
      setMessage(`${res.data.message} Redirecting to login...`);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-16 p-8 bg-black rounded-2xl shadow-lg border border-teal-700">
      <h2 className="text-2xl font-extrabold text-teal-600 mb-6 text-center">Set New Password</h2>
      <input
        type="password"
        placeholder="Enter New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full mb-5 px-4 py-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        className="w-full mb-5 px-4 py-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      <button type="submit" disabled={loading} className="w-full py-3 rounded-lg font-semibold text-black bg-teal-400 hover:bg-green-700 hover:text-white transition">
        {loading ? 'Resetting...' : 'Reset Password'}
      </button>
      {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
    </form>
  );
}