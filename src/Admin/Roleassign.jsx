import React, { useState, useEffect } from "react";
import axios from "axios";

const RolesAssign = () => {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null); // Store the provider ID for deletion confirmation

  // Fetch the list of service providers with pending roles
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/serviceProviders") // Fetch service providers from backend
      .then((response) => {
        setServiceProviders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching service providers:", error);
      });
  }, []);

  // Accept a service provider's role
  const acceptRole = (id) => {
    axios
      .put(`http://localhost:8080/api/serviceProviders/${id}/accept`) // Accept the role on backend
      .then((response) => {
        // Update the status in the table without re-fetching data
        setServiceProviders(serviceProviders.map((provider) =>
          provider.id === id ? { ...provider, status: "accepted" } : provider
        ));
      })
      .catch((error) => {
        console.error("Error accepting service provider:", error);
      });
  };

  // Reject a service provider's role
  const rejectRole = (id) => {
    axios
      .delete(`http://localhost:8080/api/serviceProviders/${id}/reject`) // Reject the role on backend
      .then((response) => {
        // Remove the rejected provider from the table
        setServiceProviders(serviceProviders.filter((provider) => provider.id !== id));
      })
      .catch((error) => {
        console.error("Error rejecting service provider:", error);
      });
  };

  // Open confirm delete modal
  const openConfirmDelete = (id) => {
    setConfirmDelete(id);
  };

  // Close confirm delete modal
  const closeConfirmDelete = () => {
    setConfirmDelete(null);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    rejectRole(confirmDelete); // Proceed with rejection
    closeConfirmDelete(); // Close the modal after rejection
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-300 flex items-center justify-center py-8">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full sm:w-4/5 lg:w-2/3 xl:w-1/2">
        <h2 className="text-4xl font-bold text-center text-indigo-600 mb-6">Manage Service Providers</h2>

        {/* Table to display service providers */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-600 uppercase bg-indigo-100">
              <tr>
                <th className="py-3 px-6 border-b">Name</th>
                <th className="py-3 px-6 border-b">Email</th>
                <th className="py-3 px-6 border-b">Role</th>
                <th className="py-3 px-6 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {serviceProviders.map((provider) => (
                <tr key={provider.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">{provider.name}</td>
                  <td className="py-3 px-6">{provider.email}</td>
                  <td className="py-3 px-6">{provider.role}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`py-1 px-3 rounded-full text-sm ${
                        provider.status === "pending"
                          ? "bg-yellow-500 text-white"
                          : provider.status === "accepted"
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      }`}
                    >
                      {provider.status}
                    </span>
                  </td>
                  {provider.status === "pending" && (
                    <td className="py-3 px-6">
                      <button
                        onClick={() => acceptRole(provider.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => openConfirmDelete(provider.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        Reject
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to reject this service provider?</p>
            <div className="flex justify-between">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
              >
                Yes, Reject
              </button>
              <button
                onClick={closeConfirmDelete}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesAssign;
