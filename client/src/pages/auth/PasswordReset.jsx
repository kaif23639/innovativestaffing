import React, { useState } from 'react';
import api from '../../api';

export default function PasswordReset({ onBack }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordResetRequest = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      await api.post('/api/users/password-reset/request', { email });
      setMessage('Password reset instructions sent to your email.');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to request password reset');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handlePasswordResetRequest}
      className="max-w-md mx-auto mt-16 p-8 bg-black rounded-2xl shadow-lg font-sans border border-teal-700"
    >
      <h2 className="text-2xl font-extrabold text-teal-600 mb-6 text-center">
        Password Reset
      </h2>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full mb-5 px-4 py-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg font-semibold text-black transition ${
          loading
            ? 'bg-teal-400 cursor-not-allowed'
            : 'bg-teal-400 hover:bg-green-700 hover:text-white'
        }`}
      >
        {loading ? 'Requesting...' : 'Request Password Reset'}
      </button>

      {message && (
        <p className="mt-4 text-green-500 font-medium text-center">{message}</p>
      )}
      {error && (
        <p className="mt-4 text-red-500 font-medium text-center">{error}</p>
      )}

      <button
        type="button"
        onClick={onBack}
        className="mt-6 block mx-auto text-center text-teal-400 font-semibold hover:text-teal-200"
      >
        Back
      </button>
    </form>
  );
}
