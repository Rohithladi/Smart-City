import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaTimesCircle,FaPaperPlane, FaMapMarkerAlt, FaClock, FaUser, FaTimes, FaSpinner ,FaSmile} from 'react-icons/fa';
import axios from 'axios';

const ViewComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);  // Corrected line
  const [isSatisfySelected, setIsSatisfySelected] = useState(null); // Initially null, so no section is open
  const [showModal, setShowModal] = useState(false); // State to show modal
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/complaints?username=${username}`);
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, [username]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending ':
        return 'bg-yellow-500';
      case 'Resolved':
        return 'bg-green-500';
      case 'Rejected':
        return 'bg-red-500';
      case 'In Progress':
        return 'bg-blue-500';
      case 'Satisfied':  // New case for Satisfied
        return 'bg-purple-500';  // You can change this color to fit your design
      case 'Sent to Admin':  // New case for Sent to Admin
        return 'bg-indigo-500';  // You can change this color to fit your design
      default:
        return 'bg-gray-500';
    }
};

const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <FaExclamationCircle className="mr-2 text-yellow-500" />;
      case 'Resolved':
        return <FaCheckCircle className="mr-2 text-green-500" />;
      case 'Rejected':
        return <FaTimesCircle className="mr-2 text-red-500" />;
      case 'In Progress':
        return <FaSpinner className="mr-2 text-blue-500" />;
      case 'Satisfied':  // New case for Satisfied
        return <FaSmile className="mr-2 text-purple-500" />;  // Using FaSmile for Satisfied icon
      case 'Sent to Admin':  // New case for Sent to Admin
        return <FaPaperPlane className="mr-2 text-indigo-500" />;  // Using FaPaperPlane for Sent to Admin icon
      default:
        return null;
    }
};



  const handleRatingSubmit = async () => {
    setIsLoading(true);
    try {
        const response = await axios.post(`http://localhost:8080/api/complaints/rate/${selectedComplaint.id}`, {
            rating: rating, // Send the rating field as part of the JSON object
        });

        if (response.status === 200) {
            alert('Rating submitted successfully!');
        }
        setSelectedComplaint((prev) => ({
          ...prev,
          status: 'Satisfied',  // Update status
      }));

        
    } catch (error) {
        console.error('Error submitting rating:', error);
    } finally {
        setIsLoading(false);
        setShowModal(false); // Close modal after submitting
    }
};

const handleFeedbackSubmit = async () => {
  setIsLoading(true);
  try {
      const response = await axios.post(`http://localhost:8080/api/complaints/feedback/${selectedComplaint.id}`, {
          feedback: feedback,
      });

      if (response.status === 200) {
          // Update status to 'Sent to Admin'
          setSelectedComplaint((prev) => ({
              ...prev,
              status: 'Sent to Admin',  // Update status
          }));

          alert('Feedback submitted and sent to admin!');
      }
  } catch (error) {
      console.error('Error submitting feedback:', error);
  } finally {
      setIsLoading(false);
      setShowModal(false); // Close modal after submitting
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">My Complaints</h1>

      {selectedComplaint ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedComplaint(null)}
            >
              <FaTimes size={20} />
            </button>
            {selectedComplaint.attachmentBase64 && (
              <img
                src={`data:image/jpeg;base64,${selectedComplaint.attachmentBase64}`}
                alt="Complaint attachment"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{selectedComplaint.category}</h2>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Description:</span> {selectedComplaint.description}
            </p>
            <div className="text-gray-700 mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-blue-500" />
              <span>Location:</span> {selectedComplaint.location}
            </div>

            <div className="text-gray-700 mb-2 flex items-center">
              <div className="flex items-center mr-2">{getStatusIcon(selectedComplaint.status)}</div>
              <span className="font-medium">Status :</span>
              <div className="flex items-center ml-2">
                <span className={`${getStatusColor(selectedComplaint.status)} text-white px-2 py-1 rounded`}>
                  {selectedComplaint.status}
                </span>
              </div>
            </div>

            <p className="text-gray-700 mb-2 flex items-center">
              <FaClock className="mr-2 text-green-500" />
              <span>Urgency:</span> {selectedComplaint.urgency}
            </p>
            <p className="text-gray-700 mb-4 flex items-center">
              <FaUser className="mr-2 text-purple-500" />
              <span>Username:</span> {selectedComplaint.username}
            </p>

            {selectedComplaint.status === 'Resolved' && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Provide Feedback:</h3>
                <div className="flex items-center mb-4">
                  <button
                    className={`mr-4 ${isSatisfySelected === true ? 'text-gray-500' : 'text-green-500'}`}
                    onClick={() => {
                      setIsSatisfySelected(true);
                      setShowModal(true); // Show modal when clicked
                    }}
                    disabled={isSatisfySelected === true}
                  >
                    Satisfy
                  </button>
                  <button
                    className={`mr-4 ${isSatisfySelected === false ? 'text-gray-500' : 'text-red-500'}`}
                    onClick={() => {
                      setIsSatisfySelected(false);
                      setShowModal(true); // Show modal when clicked
                    }}
                    disabled={isSatisfySelected === false}
                  >
                    Unsatisfy
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((complaint, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden"
              onClick={() => setSelectedComplaint(complaint)}
            >
              <div className="relative">
                {complaint.attachmentBase64 ? (
                  <img
                    src={`data:image/jpeg;base64,${complaint.attachmentBase64}`}
                    alt="Complaint"
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-300"></div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  {getStatusIcon(complaint.status)}
                  <span
                    className={`${getStatusColor(complaint.status)} text-white px-2 py-1 rounded`}
                  >
                    {complaint.status}
                  </span>
                </div>
                <p className="text-gray-700 truncate">{complaint.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Feedback and Rating */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              <FaTimes size={20} />
            </button>

            {isSatisfySelected === true && (
              <div>
                <h3 className="font-semibold text-lg mb-4">Please rate the resolution:</h3>
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`${
                        star <= rating ? 'text-yellow-500' : 'text-gray-400'
                      }`}
                      onClick={() => setRating(star)}
                    >
                      &#9733;
                    </button>
                  ))}
                </div>
                {isLoading ? (
                  <button className="bg-blue-500 text-white py-2 px-4 rounded w-full" disabled>
                    <FaSpinner className="animate-spin mr-2" />
                    Submitting...
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                    onClick={handleRatingSubmit}
                  >
                    Submit Rating
                  </button>
                )}
              </div>
            )}

            {isSatisfySelected === false && (
              <div>
                <h3 className="font-semibold text-lg mb-4">Provide Feedback:</h3>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                {isLoading ? (
                  <button className="bg-blue-500 text-white py-2 px-4 rounded w-full" disabled>
                    <FaSpinner className="animate-spin mr-2" />
                    Submitting...
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                    onClick={handleFeedbackSubmit}
                  >
                    Submit Feedback
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewComplaint;
