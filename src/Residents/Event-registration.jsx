import React from "react";
import { Link } from "react-router-dom";

const EventRegistrationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-300 flex flex-col items-center justify-start py-10">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-3xl font-bold text-center text-indigo-500 mb-6">Event Registration Page</h2>

        {/* Upcoming Events */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Upcoming City Events</h3>
          <p className="text-gray-700 mb-2">Event 1: City Marathon (Date: 15th Dec, 2024)</p>
          <p className="text-gray-700 mb-2">Event 2: Food Festival (Date: 20th Dec, 2024)</p>
        </div>

        {/* Event Registration Form */}
        <div className="mb-8">
          <button
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-md shadow-md transform hover:scale-105 transition duration-300"
          >
            Register for Events
          </button>
        </div>

        {/* Navigation Option */}
        <Link 
          to="/resident-dashboard" 
          className="w-full py-3 bg-gray-500 text-white font-semibold rounded-md shadow-md transform hover:scale-105 transition duration-300 text-center block no-underline"
        >
          Back to User Dashboard
        </Link>
      </div>
    </div>
  );
};

export default EventRegistrationPage;
