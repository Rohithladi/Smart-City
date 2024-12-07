import React from "react";
import { Link } from "react-router-dom";
import { FaRegEdit, FaClipboardList } from "react-icons/fa";

const ServiceRequestPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-300 flex flex-col items-center justify-start py-10 px-4">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-3xl">
        <h2 className="text-4xl font-bold text-center text-indigo-600 mb-6 animate-pulse">
          Service Request Page
        </h2>
        <p className="text-center text-gray-700 text-lg mb-8">
          Easily submit and track your requests for public services. We're here to help!
        </p>

        {/* Submit New Service Request */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-indigo-500 mb-4 flex items-center gap-2">
            <FaRegEdit className="text-indigo-600" />
            Submit New Service Request
          </h3>
          <form>
            <div className="mb-6">
              <label htmlFor="requestType" className="block text-lg font-medium text-gray-700 mb-2">
                Select Request Type
              </label>
              <select
                id="requestType"
                name="requestType"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Choose a type</option>
                <option value="water-supply">Water Supply Issue</option>
                <option value="garbage-collection">Garbage Collection</option>
                <option value="street-repairs">Street Repairs</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="requestDetails" className="block text-lg font-medium text-gray-700 mb-2">
                Request Details
              </label>
              <textarea
                id="requestDetails"
                name="requestDetails"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Provide details about your request..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold rounded-md shadow-md transform hover:scale-105 transition duration-300"
            >
              Submit Request
            </button>
          </form>
        </div>

        {/* Existing Requests Section */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-indigo-500 mb-4 flex items-center gap-2">
            <FaClipboardList className="text-indigo-600" />
            Track Existing Requests
          </h3>
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <p className="text-gray-700 text-lg">
              <strong>Request #12345:</strong> Garbage collection request - <span className="text-yellow-500">Pending</span>
            </p>
            <p className="text-gray-700 text-lg mt-2">
              <strong>Request #12346:</strong> Street repair request - <span className="text-green-500">Completed</span>
            </p>
          </div>
          <p className="text-gray-500 mt-4 text-center">
            To manage your requests, please visit the service tracking section on the dashboard.
          </p>
        </div>

        {/* Navigation */}
        <Link
          to="/resident-dashboard"
          className="w-full py-3 bg-gray-500 text-white font-bold rounded-md shadow-md transform hover:scale-105 transition duration-300 text-center block"
        >
          Back to User Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ServiceRequestPage;
