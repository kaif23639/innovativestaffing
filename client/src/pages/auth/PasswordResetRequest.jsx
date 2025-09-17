// src/components/Auth/PasswordResetRequest.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

export default function PasswordResetRequest() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/api/users/password-reset/request', { email });
      // On success, navigate to the OTP verify page
      // Pass the email in the router's state so the next page can use it
      navigate('/verify-otp-reset', { state: { email } });
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-16 p-8 bg-black rounded-2xl shadow-lg border border-teal-700">
      <h2 className="text-2xl font-extrabold text-teal-600 mb-6 text-center">Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full mb-5 px-4 py-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      <button type="submit" disabled={loading} className="w-full py-3 rounded-lg font-semibold text-black bg-teal-400 hover:bg-green-700 hover:text-white transition">
        {loading ? 'Sending...' : 'Send Reset OTP'}
      </button>
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
    </form>
  );
}