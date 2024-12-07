import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Signup from "./Authentication/Signup";
import Signin from "./Authentication/Signin";
import Cityresource from "./Residents/Cityresource";
import Servicerequest from "./Residents/Servicerequest";
import Feedback from "./Residents/Feedback";
import Event from "./Residents/Event-registration";
import Resident from "./Residents/Resident";
import Servicedashboard from "./ServiceProvider/Servicedashboard";
import Adminashboard from "./Admin/AdminDashboard";
import Roleassign from "./Admin/Roleassign";
import ResidentCitizenship from "./ServiceProvider/ResidentCitizenship";
import Map from "./Residents/Map";
import PostCompalint from "./Residents/PostCompalint";
import ViewComplaint from "./Residents/ViewComplaint";
import ServiceComplaints from "./ServiceProvider/ServiceComplaints";
import ComplaintsPage from "./Admin/ComplaintsPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/city-resources" element={<Cityresource />} />
        <Route path="/service-requests" element={<Servicerequest />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/event-registration" element={<Event />} />
        <Route path="/resident-dashboard" element={<Resident />} />
        <Route path="/service-dashboard" element={<Servicedashboard />} />
        <Route path="/admin-dashboard" element={<Adminashboard />} />
        <Route path="/roles" element={<Roleassign />} />
        <Route path="/citizen" element={<ResidentCitizenship />} />
        <Route path="/map" element={<Map />} />
        <Route path="/complaint" element={<PostCompalint />} />
        <Route path="/view-complaint" element={<ViewComplaint />} />
        <Route path="/Service-complaint" element={<ServiceComplaints />} />
        <Route path="/admin-complaint" element={<ComplaintsPage />} />
      </Routes>


    </Router>
  );
}

export default App;
