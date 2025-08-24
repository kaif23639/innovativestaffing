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
      className="max-w-md mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg font-sans"
    >
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">
        Password Reset
      </h2>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full mb-5 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg font-semibold text-white transition ${
          loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Requesting...' : 'Request Password Reset'}
      </button>

      {message && (
        <p className="mt-4 text-green-600 font-medium text-center">{message}</p>
      )}
      {error && (
        <p className="mt-4 text-red-600 font-medium text-center">{error}</p>
      )}

      <button
        type="button"
        onClick={onBack}
        className="mt-6 block mx-auto text-center text-blue-600 font-semibold hover:underline"
      >
        Back
      </button>
    </form>
  );
}
