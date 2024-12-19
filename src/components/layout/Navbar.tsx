import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

export default function Navbar() {
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Redirect to the login page
    window.location.href = '/login'; // Use navigate('/login') if using react-router's navigate
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <FileText className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">FormCraft</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              to="/forms"
              className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              My Forms
            </Link>
            <Link
              to="/forms/new"
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600"
            >
              Create Form
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
