import React from "react";
import { Link } from "react-router-dom";
import { FaHandsHelping, FaMapMarkedAlt, FaCommentDots, FaCalendarAlt, FaUserCircle, FaBell } from "react-icons/fa";

const ResidentDashboard = () => {
  const username = localStorage.getItem("username") || "Resident";
  const city = localStorage.getItem("City") || "City";


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-300 p-8">
      {/* Welcome message */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, <span className="text-indigo-600">{username}</span> to the Resident Dashboard from <span className="text-indigo-600">{city}</span>
        </h1>
        <p className="text-lg text-gray-600 mt-4">Explore the available features and manage your city services.</p>
      </div>

      {/* Dashboard Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Service Requests */}
        <Link
          to="/service-requests"
          className="group p-6 bg-indigo-600 rounded-lg shadow-md transition-all duration-300 transform text-white hover:shadow-xl no-underline"
        >
          <FaHandsHelping className="text-5xl mx-auto mb-4 group-hover:animate-bounce" />
          <h2 className="text-xl font-semibold text-center">Service Requests</h2>
          <p className="text-center mt-3">Submit, track, or update your service requests for public utilities.</p>
        </Link>

        {/* City Resources */}
        <Link
          to="/city-resources"
          className="group p-6 bg-green-600 rounded-lg shadow-md transition-all duration-300 transform text-white hover:shadow-xl no-underline"
        >
          <FaMapMarkedAlt className="text-5xl mx-auto mb-4 group-hover:animate-pulse" />
          <h2 className="text-xl font-semibold text-center">City Resources</h2>
          <p className="text-center mt-3">Access city maps, transportation schedules, and emergency contacts.</p>
        </Link>

        
        <Link
          to="/complaint"
          className="group p-6 bg-yellow-600 rounded-lg shadow-md transition-all duration-300 transform text-white hover:shadow-xl no-underline"
        >
          <FaCommentDots className="text-5xl mx-auto mb-4 group-hover:animate-bounce" />
          <h2 className="text-xl font-semibold text-center">Complaints</h2>
          <p className="text-center mt-3">complaints and track responses.</p>
        </Link>

        {/* Events */}
        <Link
          to="/event-registration"
          className="group p-6 bg-purple-600 rounded-lg shadow-md transition-all duration-300 transform text-white hover:shadow-xl no-underline"
        >
          <FaCalendarAlt className="text-5xl mx-auto mb-4 group-hover:animate-spin" />
          <h2 className="text-xl font-semibold text-center">Events</h2>
          <p className="text-center mt-3">Browse and register for upcoming city events.</p>
        </Link>

        {/* Profile */}
        <Link
          to="/profile"
          className="group p-6 bg-blue-600 rounded-lg shadow-md transition-all duration-300 transform text-white hover:shadow-xl no-underline"
        >
          <FaUserCircle className="text-5xl mx-auto mb-4 group-hover:animate-pulse" />
          <h2 className="text-xl font-semibold text-center">Profile</h2>
          <p className="text-center mt-3">Manage your profile and update your account settings.</p>
        </Link>

        {/* Emergency Alerts */}
        <Link
          to="/emergency-alerts"
          className="group p-6 bg-red-600 rounded-lg shadow-md transition-all duration-300 transform text-white hover:shadow-xl no-underline"
        >
          <FaBell className="text-5xl mx-auto mb-4 group-hover:animate-bounce" />
          <h2 className="text-xl font-semibold text-center">Emergency Alerts</h2>
          <p className="text-center mt-3">Get real-time notifications for emergencies.</p>
        </Link>
      </div>
    </div>
  );
};

export default ResidentDashboard;
