import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaExclamationCircle, FaUser, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import { MdFeedback } from "react-icons/md";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/complaints/all");
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };
    fetchComplaints();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-purple-200 p-8">
      <h1 className="text-4xl font-bold text-purple-700 text-center mb-8 animate-fadeIn">
        Admin Complaints Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {complaints.map((complaint, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105"
          >
            {complaint.attachmentBase64 && (
              <img
                src={`data:image/jpeg;base64,${complaint.attachmentBase64}`}
                alt="Complaint attachment"
                className="w-full h-64 object-cover rounded-lg mb-4 animate-fadeIn"
              />
            )}

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FaExclamationCircle className="text-2xl text-purple-500 animate-pulse" />
                <h2 className="text-lg font-semibold text-gray-800">{complaint.category}</h2>
              </div>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  complaint.urgency === "High"
                    ? "bg-red-100 text-red-500"
                    : complaint.urgency === "Medium"
                    ? "bg-yellow-100 text-yellow-500"
                    : "bg-green-100 text-green-500"
                }`}
              >
                {complaint.urgency}
              </span>
            </div>

            <p className="text-gray-600 mb-4">
              <BiCommentDetail className="inline text-xl text-purple-400" /> {" "}
              <span className="font-medium">Description:</span> {complaint.description}
            </p>

            <div className="mb-4">
              <FaMapMarkerAlt className="inline text-xl text-green-500" /> {" "}
              <span className="font-medium">Location:</span> {complaint.location}
            </div>

            <div className="flex items-center gap-4 mb-4">
              <FaUser className="text-xl text-blue-500" />
              <div>
                <p className="font-medium text-gray-800">{complaint.username}</p>
                <p className="text-gray-500 text-sm">
                  <FaEnvelope className="inline text-gray-400" /> {complaint.email}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <MdFeedback className="inline text-xl text-yellow-500" /> {" "}
              <span className="font-medium">Feedback:</span> {complaint.feedback ? JSON.parse(complaint.feedback).feedback : "No feedback provided"}
            </div>

            <div className="flex items-center mb-4">
              <span className="font-medium">Rating:</span>
              <div className="ml-2 flex items-center">
                {Array(complaint.rating)
                  .fill()
                  .map((_, i) => (
                    <AiFillStar key={i} className="text-yellow-500" />
                  ))}
                {Array(5 - complaint.rating)
                  .fill()
                  .map((_, i) => (
                    <AiOutlineStar key={i} className="text-gray-300" />
                  ))}
              </div>
            </div>

            <div className="mt-4">
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  complaint.status === "Resolved"
                    ? "bg-green-100 text-green-500"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                Status: {complaint.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintsPage;