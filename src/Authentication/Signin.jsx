import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Function to generate a random CAPTCHA string
const generateCaptcha = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
};

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha()); // Set the initial CAPTCHA
  const [captchaInput, setCaptchaInput] = useState(""); // State for user input CAPTCHA
  const navigate = useNavigate();

  // Function to refresh the CAPTCHA when clicked
  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput(""); // Clear the previous input
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    if (captchaInput !== captcha) {
      setError("Please enter the correct CAPTCHA.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/signin?email=${email}&password=${password}&role=${role}`
      );

      const result = response.data;
      console.log(result);

      if (result === "Invalid credentials") {
        setError("Oops! Invalid credentials. Please check your email, password, and role.");
      } else if (result === "Admin approval is pending") {
        setError("Admin approval is pending. Please wait for approval.");
      } else if (result === "Service provider approval is pending") {
        setError("Your approval is pending from admin. Please wait for approval.");
      } else if (result === "Resident approval is pending") {
        setError("Your approval is pending from the Service Provider. Please wait for approval.");
      } else {
        const userDetailsResponse = await axios.get(
          `http://localhost:8080/api/user-details/${email}`
        );
        const userDetails = userDetailsResponse.data;
        
        const { name, city } = userDetails; 
        
        
        setWelcomeMessage(`Welcome, ${name} from ${city}! We're excited to have you on board.`);
        localStorage.setItem("email", email);
        localStorage.setItem("username", name);
        localStorage.setItem("City", city);

        

        setError(""); // Clear any error message

        // Hide sign-in form and display the welcome message
        setIsSignedIn(true);

        // Delay navigation by 2 seconds
        setTimeout(() => {
          console.log("API Result:", result);

          switch (result) {
            case "admin":
              navigate("/admin-dashboard");
              break;
            case "resident":
              navigate("/resident-dashboard");
              break;
            case "service provider":
              navigate("/service-dashboard");
              break;
            default:
              setError("Invalid role. Please contact support.");
          }
        }, 2000);
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setError("😞 Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-300 flex items-center justify-center relative overflow-hidden">
      {/* SmartCity Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-300 via-purple-400 to-indigo-500 animate-gradient"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-clip-border bg-opacity-20 rounded-full animate-float-slow bg-indigo-600"></div>
      </div>

      {/* Render sign-in form if not signed in */}
      {!isSignedIn ? (
        <div className="relative z-10 bg-white p-10 rounded-xl shadow-xl w-full max-w-md sm:w-full border-t-4 border-indigo-500 space-y-8 overflow-x-hidden">
          <h2 className="text-4xl font-extrabold text-center text-indigo-600 mb-6 tracking-tight">
            Welcome Back to SmartCity!
          </h2>

          <form onSubmit={handleSignIn} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
              />
            </div>

            {/* Role Dropdown */}
            <div className="space-y-2">
              <label htmlFor="role" className="block text-lg font-medium text-gray-700">
                Select Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Choose your role</option>
                <option value="admin">Admin</option>
                <option value="resident">Resident</option>
                <option value="moderator">Service Provider</option>
              </select>
            </div>

            {/* CAPTCHA */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">CAPTCHA</label>
              <div className="flex items-center space-x-2">
                <div
                  onClick={refreshCaptcha}
                  className="text-xl font-bold text-blue-500 cursor-pointer"
                  style={{
                    userSelect: "none",
                    border: "1px solid #ccc",
                    padding: "10px 4px",
                    borderRadius: "8px",
                  }}
                >
                  {captcha}
                </div>
                <input
                  type="text"
                  required
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter the CAPTCHA"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-2">
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-md shadow-md transform hover:scale-105 transition duration-300"
              >
                Sign In
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 text-center">
                <div className="p-3 bg-red-500 text-white rounded-md shadow-md">
                  <p className="font-semibold">{error}</p>
                </div>
              </div>
            )}
          </form>
        </div>
      ) : (
        // Show the welcome message after signing in
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="text-center bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-3xl font-extrabold text-indigo-600 mb-4">{welcomeMessage}</h2>
            <p className="text-lg text-gray-700 mb-4">
              We are thrilled to have you on board! You will be redirected shortly based on your role.
            </p>
            <p className="text-md text-gray-500">
              Please wait while we redirect you to your dashboard...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignInPage;
