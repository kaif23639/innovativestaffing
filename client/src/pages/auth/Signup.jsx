import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    age: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

const handleRequestOtp = async (e) => {
  e.preventDefault();
  setError('');
  setMessage('');

  if (parseInt(formData.age, 10) < 18) {
    setError('You must be at least 18 years old to signup.');
    return;
  }
  if (formData.password !== formData.confirmPassword) {
    setError('Passwords do not match.');
    return;
  }

  setLoading(true);
  try {
    await api.post('/api/users/signup/request-otp', { email: formData.email });

    // Save signup data in localStorage for OTP verification page use
    localStorage.setItem('signupData', JSON.stringify({
      email: formData.email,
      name: formData.name,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      age: parseInt(formData.age, 10),
    }));

    setMessage('OTP sent to your email.');

    // Redirect user to OTP verification page
    navigate('/verify-otp');
  } catch (err) {
    setError(err.response?.data?.msg || 'Failed to send OTP');
  } finally {
    setLoading(false);
  }
};


  return (
    <form
      onSubmit={handleRequestOtp}
      className="max-w-md mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg font-sans"
      noValidate
    >
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">Signup - Request OTP</h2>

      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <input
        type="text"
        name="name"
        placeholder="Enter your full name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <input
        type="number"
        name="age"
        placeholder="Age (must be 18+)"
        value={formData.age}
        onChange={handleChange}
        min={18}
        required
        className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        minLength={6}
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        className="w-full mb-6 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        minLength={6}
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg font-semibold text-white ${
          loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        } transition`}
      >
        {loading ? 'Sending OTP...' : 'Send OTP'}
      </button>

      {message && <p className="mt-4 text-green-600 font-medium text-center">{message}</p>}
      {error && <p className="mt-4 text-red-600 font-medium text-center">{error}</p>}
    </form>
  );
}
