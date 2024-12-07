import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,

  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle
} from "react-icons/fa"; // Add relevant icons

const ServiceProviderDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [setIsInProgress] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all complaints on load
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

  const handleComplaintClick = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const handleUpdateStatus = async () => {
    if (selectedComplaint) {
      try {
        const updatedComplaint = { ...selectedComplaint, status: "In Progress" };
        const response = await axios.put(
          `http://localhost:8080/api/complaints/${selectedComplaint.id}`,
          updatedComplaint
        );
        setComplaints(complaints.map((complaint) =>
          complaint.id === selectedComplaint.id ? response.data : complaint
        ));
        setSelectedComplaint(response.data);
        setIsInProgress(true);
        alert("Complaint status updated to 'In Progress'. Team dispatched!");
      } catch (error) {
        console.error("Error updating status:", error);
        alert("Status updated to In Progress");
      }
    }
  };

  const handleRejectStatus = async () => {
    if (selectedComplaint) {
      try {
        const updatedComplaint = { ...selectedComplaint, status: "Rejected" };
        const response = await axios.put(
          `http://localhost:8080/api/complaints/reject/${selectedComplaint.id}`,
          updatedComplaint
        );
        setComplaints(complaints.map((complaint) =>
          complaint.id === selectedComplaint.id ? response.data : complaint
        ));
        setSelectedComplaint(response.data);
        alert("Complaint status updated to 'Rejected' due to location issue.");
      } catch (error) {
        console.error("Error updating status:", error);
        alert("Failed to reject status. Please try again.");
      }
    }
  };

  const handleResolveStatus = async () => {
    if (selectedComplaint) {
      try {
        const updatedComplaint = { ...selectedComplaint, status: "Resolved" };
        const response = await axios.put(
          `http://localhost:8080/api/complaints/resolve/${selectedComplaint.id}`,
          updatedComplaint
        );
        setComplaints(complaints.map((complaint) =>
          complaint.id === selectedComplaint.id ? response.data : complaint
        ));
        setSelectedComplaint(response.data);
        alert("Complaint status updated to 'Resolved'. Thank you for your patience!");
      } catch (error) {
        console.error("Error updating status:", error);
        alert("Failed to update status. Please try again.");
      }
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={`full-${index}`} className="text-yellow-500" />
        ))}
        {[...Array(halfStars)].map((_, index) => (
          <FaStarHalfAlt key={`half-${index}`} className="text-yellow-500" />
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={`empty-${index}`} className="text-yellow-500" />
        ))}
      </div>
    );
  };

  const renderStatus = (status) => {
    switch (status) {
      case "Pending":
        return (
          <div className="flex items-center text-yellow-500">
            <FaExclamationTriangle className="mr-2" /> <span>{status}</span>
          </div>
        );
      case "In Progress":
        return (
          <div className="flex items-center text-blue-500">
            <FaSpinner className="mr-2 animate-spin" /> <span>{status}</span>
          </div>
        );
      case "Resolved":
        return (
          <div className="flex items-center text-green-500">
            <FaCheckCircle className="mr-2" /> <span>{status}</span>
          </div>
        );
      case "Satisfied":
        return (
          <div className="flex items-center text-purple-500">
            <FaCheckCircle className="mr-2" /> <span>{status}</span>
          </div>
        );
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-8">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
          Service Provider Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">All Complaints</h2>
            {complaints.length === 0 ? (
              <p className="text-gray-600">No complaints available.</p>
            ) : (
              <ul className="space-y-6">
                {complaints.map((complaint) => (
                  <li
                    key={complaint.id}
                    className="border border-gray-300 p-5 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                    onClick={() => handleComplaintClick(complaint)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-semibold text-lg">{complaint.category}</span>
                      {renderStatus(complaint.status)}
                    </div>
                    <p className="text-gray-600 mt-2">{complaint.description.substring(0, 50)}...</p>
                    {complaint.status === "Satisfied" && (
                      <div className="mt-2 text-gray-500">
                        <strong>Rating: </strong>
                        {renderRating(complaint.rating)}
                      </div>
                    )}
                    {complaint.status === "Pending" &&   (
                      <>
                        <button
                          onClick={handleUpdateStatus}
                          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
                        >
                          Mark as In Progress
                        </button>

                        <button
                          onClick={handleRejectStatus}
                          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 focus:outline-none"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {selectedComplaint && (
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Complaint Details</h2>
              <div className="space-y-4">
                <p><strong>Category:</strong> {selectedComplaint.category}</p>
                <p><strong>Description:</strong> {selectedComplaint.description}</p>
                <p><strong>Urgency:</strong> {selectedComplaint.urgency}</p>
                <p><strong>Location:</strong> {selectedComplaint.location}</p>
                <p>
                  <strong>Status:</strong>
                  {renderStatus(selectedComplaint.status)}
                </p>
                {selectedComplaint.resolutionDetails && (
                  <p><strong>Resolution Details:</strong> {selectedComplaint.resolutionDetails}</p>
                )}
                {selectedComplaint.attachmentBase64 && (
                  <div className="mt-6 flex justify-center">
                    <img
                      src={`data:image/jpeg;base64,${selectedComplaint.attachmentBase64}`}
                      alt="Complaint Attachment"
                      className="w-full md:w-3/4 lg:w-3/4 xl:w-2/3 h-auto rounded-lg shadow-lg cursor-pointer"
                      onClick={openModal}
                    />
                  </div>
                )}
                {selectedComplaint.status === "Satisfied" && (
                  <div className="mt-2 text-gray-500">
                    <strong>Rating: </strong>
                    {renderRating(selectedComplaint.rating)}
                  </div>
                )}
                {selectedComplaint.status === "In Progress" && !selectedComplaint.resolutionDetails && (
                  <button
                    onClick={handleResolveStatus}
                    className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none"
                  >
                    Mark as Resolved
                  </button>
                )}
                {selectedComplaint.status !== "Rejected" && selectedComplaint.status !== "Resolved" && selectedComplaint.status !== "Satisified" &&  (
                  <button
                    onClick={handleRejectStatus}
                    className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 focus:outline-none"
                  >
                    Reject
                  </button>
                )}

              </div>
            </div>
          )}
        </div>

        {isModalOpen && selectedComplaint && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4">Complaint Attachment</h3>
                <img
                  src={`data:image/jpeg;base64,${selectedComplaint.attachmentBase64}`}
                  alt="Attachment"
                  className="max-w-full h-auto"
                />
                <div className="mt-4">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700 focus:outline-none"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceProviderDashboard;
