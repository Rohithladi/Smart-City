import React, { useState, useEffect } from "react";
import axios from "axios";

const ResidentCitizenship = () => {
  const [residents, setResidents] = useState([]); // State to store resident data
  const [loading, setLoading] = useState(true); // State to manage loading indicator

  useEffect(() => {
    // Fetch residents data
    axios
      .get("http://localhost:8080/api/users") // Backend endpoint to fetch users with role=resident
      .then((response) => {
        setResidents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching residents:", error);
        setLoading(false);
      });
  }, []);

  const acceptResident = (id) => {
    axios
      .put(`http://localhost:8080/api/residents/${id}/accept`) // Backend endpoint for accepting a resident
      .then(() => {
        alert("Resident accepted.");
        // Update the status in the table without re-fetching data
        setResidents((prevResidents) =>
          prevResidents.map((resident) =>
            resident.id === id ? { ...resident, status: "accepted" } : resident
          )
        );
      })
      .catch((error) => {
        console.error("Error accepting resident:", error);
        alert("Error accepting resident.");
      });
  };

  const rejectResident = (id) => {
    if (window.confirm("Are you sure you want to reject this resident?")) {
      axios
        .delete(`http://localhost:8080/api/residents/${id}/reject`) // Reject the resident on the backend
        .then(() => {
          alert("Resident rejected.");
          // Remove the rejected resident from the table
          setResidents((prevResidents) => prevResidents.filter((resident) => resident.id !== id));
        })
        .catch((error) => {
          console.error("Error rejecting resident:", error);
          alert("Error rejecting resident.");
        });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-300 flex items-center justify-center py-8">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full sm:w-4/5 lg:w-2/3 xl:w-1/2">
        <h2 className="text-4xl font-bold text-center text-indigo-600 mb-6">Resident Citizenship Requests</h2>

        {/* Table to display residents */}
        <div className="overflow-x-auto">
          {residents.length === 0 ? (
            <p className="text-gray-600 text-center">No citizenship requests available.</p>
          ) : (
            <table className="w-full table-auto text-sm text-left text-gray-700">
              <thead className="text-xs text-gray-600 uppercase bg-indigo-100">
                <tr>
                  <th className="py-3 px-6 border-b">Name</th>
                  <th className="py-3 px-6 border-b">Email</th>
                  <th className="py-3 px-6 border-b">Role</th>
                  <th className="py-3 px-6 border-b">Status</th>
                  {residents.some((resident) => resident.status === "pending") && (
                    <th className="py-3 px-6 border-b">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {residents.map((resident) => (
                  <tr key={resident.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-6">{resident.name}</td>
                    <td className="py-3 px-6">{resident.email}</td>
                    <td className="py-3 px-6">{resident.role}</td>
                    <td className="py-3 px-6 capitalize">{resident.status}</td>
                    {resident.status === "pending" && (
                      <td className="py-3 px-6 flex gap-2 justify-center">
                        <button
                          onClick={() => acceptResident(resident.id)}
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => rejectResident(resident.id)}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ResidentCitizenship;
