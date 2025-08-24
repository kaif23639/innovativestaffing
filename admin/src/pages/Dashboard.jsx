import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard({ onLogout }) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-10">
        <header className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Admin Dashboard
          </h1>
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Logout
          </button>
        </header>

        <nav className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Link
            to="/categories"
            className="flex flex-col items-center px-6 py-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 bg-indigo-50 hover:bg-indigo-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18M6 6h12M6 18h12" />
            </svg>
            <span className="text-lg font-semibold text-indigo-700">Manage Categories</span>
          </Link>

          <Link
            to="/subpages"
            className="flex flex-col items-center px-6 py-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 bg-green-50 hover:bg-green-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
            <span className="text-lg font-semibold text-green-700">Manage Subpages</span>
          </Link>

          <Link
            to="/flipcards"
            className="flex flex-col items-center px-6 py-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 bg-yellow-50 hover:bg-yellow-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6m2 7H7a2 2 0 01-2-2V7a2 2 0 012-2h2m4-2v4M5 12h14" />
            </svg>
            <span className="text-lg font-semibold text-yellow-700">Manage FlipCards</span>
          </Link>
        </nav>

        <section>
          <p className="text-gray-700 text-lg">
            Welcome to the admin panel. Use the sections above to manage your content efficiently.
          </p>
        </section>
      </div>
    </div>
  );
}
