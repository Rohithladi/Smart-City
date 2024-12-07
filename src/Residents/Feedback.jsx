import React from "react";
import { Link } from "react-router-dom";

const FeedbackPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-300 flex flex-col items-center justify-start py-10">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-3xl font-bold text-center text-indigo-500 mb-6">Feedback Page</h2>

        {/* Feedback Form */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Submit Feedback</h3>
          <form>
            <div className="mb-4">
              <label htmlFor="feedbackDetails" className="block text-lg font-medium text-gray-700">
                Feedback Details
              </label>
              <textarea
                id="feedbackDetails"
                name="feedbackDetails"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                placeholder="Your feedback about city services"
              />
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-md shadow-md transform hover:scale-105 transition duration-300"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>

        {/* Navigation Option */}
        <Link to="/resident-dashboard" className="w-full py-3 bg-gray-500 text-white font-semibold rounded-md shadow-md transform hover:scale-105 transition duration-300 text-center block">
          Back to User Dashboard
        </Link>
      </div>
    </div>
  );
};

export default FeedbackPage;
