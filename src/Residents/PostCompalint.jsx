import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PostComplaint = () => {
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    urgency: "Low",
    location: "",
    attachment: null,
  });

  const navigate = useNavigate();

  // Fetch city name from localStorage when component mounts
  useEffect(() => {
    const city = localStorage.getItem("City");
    if (city) {
      setFormData((prevState) => ({
        ...prevState,
        location: city, // Set the city name in the location field
      }));
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, attachment: e.target.files[0] });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    const complaintData = new FormData();
    complaintData.append("category", formData.category);
    complaintData.append("description", formData.description);
    complaintData.append("urgency", formData.urgency);
    complaintData.append("location", formData.location);
    if (formData.attachment) {
      complaintData.append("attachment", formData.attachment);
    }
    complaintData.append("username", username);
    complaintData.append("email", email);

    try {
      await axios.post("http://localhost:8080/api/complaints", complaintData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Complaint submitted successfully!");
      navigate("/view-complaint"); // Navigate to the ViewComplaint page
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Failed to submit complaint.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 animate-background flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg transform hover:scale-105 transition duration-300 ease-in-out">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Post a Complaint</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Complaint Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300"
              required
            >
              <option value="">Select a category</option>
              <option value="Traffic">Traffic</option>
              <option value="Waste Management">Waste Management</option>
              <option value="Water Supply">Water Supply</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300"
              rows="4"
              placeholder="Explain your complaint in detail"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Urgency Level</label>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300"
              placeholder="Enter location (e.g., street name)"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Attachment (optional)</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-gray-500 border border-gray-300 rounded-md cursor-pointer"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Submit Complaint
          </button>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/view-complaint")}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
          >
            View Complaints
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostComplaint;
