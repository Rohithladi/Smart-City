import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const checkPasswordStrength = (password) => {
  const lengthCriteria = password.length >= 8;
  const lowercaseCriteria = /[a-z]/.test(password);
  const uppercaseCriteria = /[A-Z]/.test(password);
  const numberCriteria = /\d/.test(password);
  const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (lengthCriteria && lowercaseCriteria && uppercaseCriteria && numberCriteria && specialCharCriteria) return "Strong";
  if (password.length >= 6) return "Medium";
  return "Weak";
};

const SignUpPage = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [city, setCity] = useState(""); // State for city selection
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
    setPasswordStrength(checkPasswordStrength(password));
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    const userData = { name, email, password, role, city, status: "pending" }; // Include city in the data

    axios
      .post("http://localhost:8080/api/signup", userData)
      .then(() => {
        alert("Your request has been submitted. Please wait for approval.");
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("Error during sign up, please try again.");
        }
      });
  };

  // City options based on role (example)
  const cityOptions = {
    resident: [
      "Rayagada", "Vijayawada", "New Delhi", "Mumbai", "Chennai", "Bangalore", "Hyderabad", "Kolkata", "Pune", "Ahmedabad"
    ], // Cities for residents
    moderator: [
      "Rayagada", "Vijayawada", "New Delhi", "Mumbai", "Chennai", "Bangalore", "Hyderabad", "Kolkata", "Pune", "Ahmedabad"
    ], // Cities for service providers
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-300">
      {/* Animated Smart City Touch */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="animate-pulse bg-gradient-to-r from-blue-400 to-purple-600 w-40 h-40 rounded-full absolute top-20 left-10"></div>
        <div className="animate-pulse bg-gradient-to-r from-green-400 to-teal-600 w-40 h-40 rounded-full absolute top-40 right-20"></div>
      </div>

      <div className="z-10 bg-white p-8 rounded-lg shadow-xl w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Create Your Account</h2>

        <form onSubmit={handleSignUp} className="space-y-4">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Select Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Choose your role</option>
              <option value="resident">Resident</option>
              <option value="moderator">Service Provider</option>
            </select>
          </div>

          {/* City Dropdown (Visible only if role is selected) */}
          {role && (
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                Select City
              </label>
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Choose your city</option>
                {cityOptions[role]?.map((cityOption, index) => (
                  <option key={index} value={cityOption}>
                    {cityOption}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
            />
            <div className={`mt-1 text-sm ${passwordStrength === "Strong" ? "text-green-600" : passwordStrength === "Medium" ? "text-yellow-600" : "text-red-600"}`}>
              Password Strength: {passwordStrength}
            </div>
            <p className="text-xs text-gray-600">
              Password must be 8+ characters, with uppercase, lowercase, numbers, and special characters.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && <p className="text-sm text-red-600 text-center">{errorMessage}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Login Redirect Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-indigo-600 hover:text-indigo-800">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
