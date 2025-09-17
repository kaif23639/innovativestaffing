// src/components/Auth/OtpVerifyReset.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function OtpVerifyReset() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Read email from router state

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  if (!email) {
    // This can happen if the user navigates here directly
    return <p className="text-white text-center mt-10">Email not provided. Please start over.</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }
    // Navigate to the final page, passing both email and the entered OTP
    navigate('/set-new-password', { state: { email, otp } });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-16 p-8 bg-black rounded-2xl shadow-lg border border-teal-700">
      <h2 className="text-2xl font-extrabold text-teal-600 mb-6 text-center">Verify OTP</h2>
      <p className="text-center text-gray-400 mb-4">An OTP has been sent to {email}</p>
      <input
        type="text"
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
        className="w-full mb-5 px-4 py-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      <button type="submit" className="w-full py-3 rounded-lg font-semibold text-black bg-teal-400 hover:bg-green-700 hover:text-white transition">
        Verify
      </button>
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
    </form>
  );
}