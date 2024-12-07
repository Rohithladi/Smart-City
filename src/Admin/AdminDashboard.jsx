import React, { useState } from "react";
import { FaUserCog, FaUserShield, FaChartBar, FaRegHandshake, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [showRoleAssignments] = useState(false);
  const navigate = useNavigate();

  const handleRoleAssignmentsClick = () => {
    navigate("/roles")
  };
  const handleperformance = () => {
    navigate("/admin-complaint")
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-300 to-pink-400 text-gray-800">
      {/* Header */}
      <header className="text-center py-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-700">
          Welcome, Admin
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          Manage and oversee all aspects of the platform with ease
        </p>
      </header>

      {/* Navigation */}
      <nav className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {/* User Management */}
        <div className="group p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105">
          <FaUserCog className="text-5xl text-blue-500 mb-4 group-hover:animate-spin mx-auto" />
          <h2 className="text-2xl font-bold text-center text-gray-800 group-hover:text-blue-600">
            User Management
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Manage and oversee user accounts and profiles.
          </p>
        </div>

        {/* Role Assignments */}
        <div
          className="group p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105 cursor-pointer"
          onClick={handleRoleAssignmentsClick}  // Handle click event to toggle the section visibility
        >
          <FaUserShield className="text-5xl text-green-500 mb-4 group-hover:animate-bounce mx-auto" />
          <h2 className="text-2xl font-bold text-center text-gray-800 group-hover:text-green-600">
            Role Assignments
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Assign and manage roles for users within the platform.
          </p>
        </div>

        {/* Performance Tracking */}
        <div className="group p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105 cursor-pointer"
          onClick={handleperformance}  
        >
          <FaChartBar className="text-5xl text-purple-500 mb-4 group-hover:animate-pulse mx-auto" />
          <h2 className="text-2xl font-bold text-center text-gray-800 group-hover:text-purple-600">
            Performance Tracking
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Monitor and analyze platform performance and usage.
          </p>
        </div>

        {/* Communication */}
        <div className="group p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105">
          <FaRegHandshake className="text-5xl text-orange-500 mb-4 group-hover:animate-pulse mx-auto" />
          <h2 className="text-2xl font-bold text-center text-gray-800 group-hover:text-orange-600">
            Communication
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Efficiently communicate with your team and users.
          </p>
        </div>

        {/* Access Control */}
        <div className="group p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105">
          <FaLock className="text-5xl text-red-500 mb-4 group-hover:animate-shake mx-auto" />
          <h2 className="text-2xl font-bold text-center text-gray-800 group-hover:text-red-600">
            Access Control
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Control and manage user access rights and privileges.
          </p>
        </div>
      </nav>

      {/* Main Content */}
      {showRoleAssignments && (
        <main className="text-center mt-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Manage Service Provider Requests</h3>
          <p className="text-lg text-gray-700">
            Here you can approve or reject service providers who have requested to join the platform.
          </p>
          {/* You can replace this section with actual dynamic content like API calls */}
          <div className="mt-8 p-4 border rounded-lg bg-white shadow-md">
            <h4 className="text-xl text-gray-700">Pending Requests</h4>
            <ul className="list-none mt-4">
              {/* Mock list of pending service provider requests */}
              <li className="py-2">Service Provider 1 (Pending)</li>
              <li className="py-2">Service Provider 2 (Pending)</li>
              <li className="py-2">Service Provider 3 (Pending)</li>
            </ul>
          </div>
        </main>
      )}
    </div>
  );
};

export default AdminDashboard;
