import React from "react";
import { Link } from "react-router-dom";  // Import Link for routing

import {
  FaTools,
  FaComments,
  FaCalendarAlt,
  FaChartLine,
  FaExclamationTriangle,
  FaExclamationCircle
} from "react-icons/fa";

const ServiceProviderDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-blue-300 to-purple-400 text-gray-800">
      {/* Header */}
      <header className="text-center py-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700">
          Welcome, Service Provider
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          Manage your tasks efficiently with our dashboard
        </p>
      </header>

      {/* Navigation */}
      <nav className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {/* Service Requests */}
        <div className="group p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105">
          <Link
            to="/citizen"
            style={{ textDecoration: 'none' }} // Inline style to remove underline
            className="no-underline" // Tailwind utility class to ensure no underline
          >
            <FaTools className="text-5xl text-blue-500 mb-4 group-hover:animate-spin mx-auto" />
            <h2 className="text-2xl font-bold text-center text-gray-800 group-hover:text-blue-600">
              Citizenship Requests
            </h2>
            <p className="text-center text-gray-600 mt-2">
              Manage and respond to service requests efficiently.
            </p>
          </Link>

        </div>

        {/* Communication */}
        <div className="group p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105">
          <FaComments className="text-5xl text-green-500 mb-4 group-hover:animate-bounce mx-auto" />
          <h2 className="text-2xl font-bold text-center text-gray-800 group-hover:text-green-600">
            Communication
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Communicate seamlessly with clients and team members.
          </p>
        </div>

        {/* Schedule Management */}
        <div className="group p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105">
          <FaCalendarAlt className="text-5xl text-purple-500 mb-4 group-hover:animate-pulse mx-auto" />
          <h2 className="text-2xl font-bold text-center text-gray-800 group-hover:text-purple-600">
            Schedule Management
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Organize and manage your work schedule effectively.
          </p>
        </div>

        {/* Performance Tracking */}
        <div className="group p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105">
          <FaChartLine className="text-5xl text-red-500 mb-4 group-hover:animate-flip mx-auto" />
          <h2 className="text-2xl font-bold text-center text-gray-800 group-hover:text-red-600">
            Performance Tracking
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Monitor and analyze your performance metrics.
          </p>
        </div>

        {/* Emergency Services */}
        <div className="group p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105">
          <FaExclamationTriangle className="text-5xl text-yellow-500 mb-4 group-hover:animate-shake mx-auto" />
          <h2 className="text-2xl font-bold text-center text-gray-800 group-hover:text-yellow-600">
            Emergency Services
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Quickly respond to emergency situations.
          </p>
        </div>
        <div className="group p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105">
          <Link to="/service-complaint" className="block no-underline">
            <FaExclamationCircle className="text-5xl text-red-500 mb-4 group-hover:animate-bounce mx-auto" />
            <h2 className="text-2xl font-bold text-center text-gray-800 group-hover:text-red-600">
              Service Complaints
            </h2>
            <p className="text-center text-gray-600 mt-2">
              Address service-related complaints and ensure customer satisfaction.
            </p>
          </Link>
        </div>

      </nav>

      {/* Main Content */}
      <main className="text-center mt-10">
        <p className="text-xl text-gray-700">
          Select a feature to begin managing your tasks.
        </p>
      </main>
    </div>
  );
};

export default ServiceProviderDashboard;
