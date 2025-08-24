import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

export default function Login({ onNext }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const { data } = await api.post('/api/users/login', formData);

      // ✅ Store token and user in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setMessage('Login successful');

      // ✅ Notify parent if needed
      if (onNext) onNext(data);

      // ✅ Redirect to homepage
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg font-sans"
      noValidate
    >
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        disabled={loading}
        aria-label="Email"
      />

      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full mb-6 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        disabled={loading}
        aria-label="Password"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg font-semibold text-white transition ${
          loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {message && <p className="mt-4 text-green-600 font-medium text-center">{message}</p>}
      {error && <p className="mt-4 text-red-600 font-medium text-center">{error}</p>}

      <p className="mt-6 text-center text-sm text-gray-600">
        New User?{' '}
        <button
          type="button"
          onClick={() => navigate('/signup')}
          className="text-blue-600 hover:underline font-semibold"
          disabled={loading}
        >
          Signup
        </button>{' '}
        |{' '}
        <button
          type="button"
          onClick={() => navigate('/passwordreset')}
          className="text-blue-600 hover:underline font-semibold"
          disabled={loading}
        >
          Forgot Password?
        </button>
      </p>
    </form>
  );
}
