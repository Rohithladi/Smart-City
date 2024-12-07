import React from "react";
import { FaCity, FaTrafficLight, FaBolt, FaShieldAlt, FaChartBar, FaHome, FaDatabase } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'


const LandingPage = () => {
  const navigate = useNavigate(); // Get the navigate function from React Router

  const handleGetStartedClick = () => {
    navigate("/signup"); // Navigate to the SignUp page
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 text-gray-800 font-sans">
      {/* Header */}
      <header className="p-6 flex justify-between items-center shadow-md bg-white  top-0 z-50">
        <h1 className="text-3xl font-bold text-blue-500">
          Smart<span className="text-indigo-500">City</span>
        </h1>
        <nav className="flex justify-center space-x-8 text-lg font-medium">
  <Link to="/features" className="relative text-gray-800 hover:text-blue-500 transition duration-300 no-underline">
    Features
    <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 transition-all duration-300 hover:w-full "></span>
  </Link>
  <Link to="/services" className="relative text-gray-800 hover:text-indigo-500 transition duration-300 no-underline">
    Services
    <span className="absolute bottom-0 left-0 w-0 h-1 bg-indigo-500 transition-all duration-300 hover:w-full "></span>
  </Link>
  <Link to="/about" className="relative text-gray-800 hover:text-teal-500 transition duration-300 no-underline" >
    About
    <span className="absolute bottom-0 left-0 w-0 h-1 bg-teal-500 transition-all duration-300 hover:w-full"></span>
  </Link>
  <Link to="/contact" className="relative text-gray-800 hover:text-teal-500 transition duration-300 no-underline">
    Contact
    <span className="absolute bottom-0 left-0 w-0 h-1 bg-teal-500 transition-all duration-300 hover:w-full"></span>
  </Link>
</nav>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 opacity-40 rounded-full filter blur-2xl animate-pulse"></div>
          <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-indigo-300 opacity-40 rounded-full filter blur-2xl animate-pulse"></div>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-700 transform transition duration-300 hover:text-blue-600 hover:scale-105">
          Building{" "}
          <span className="text-blue-500 hover:text-blue-700 transform transition duration-300 hover:scale-110">
            Smart Cities
          </span>{" "}
          for a <br />
          Sustainable{" "}
          <span className="text-indigo-500 hover:text-indigo-700 transform transition duration-300 hover:scale-110">
            Future
          </span>
        </h1>

        <p className="text-lg text-gray-600 mt-6 max-w-2xl">
          Experience modern living with cutting-edge technology, sustainable solutions, and smart governance.
        </p>
        <button
          className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-10 py-4 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transform transition duration-300"
          onClick={handleGetStartedClick}
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <h2 className="text-center text-4xl font-bold text-gray-800 mb-12">
          Key Features of Smart Cities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-10 md:px-20">
          {[
            { title: "Smart Traffic", icon: <FaTrafficLight className="text-6xl text-blue-500" /> },
            { title: "Energy Management", icon: <FaBolt className="text-6xl text-indigo-500" /> },
            { title: "Eco Transport", icon: <FaCity className="text-6xl text-teal-500" /> },
            { title: "Safe City", icon: <FaShieldAlt className="text-6xl text-pink-500" /> },
            { title: "Smart Governance", icon: <FaChartBar className="text-6xl text-yellow-500" /> },
            { title: "Connected Homes", icon: <FaHome className="text-6xl text-green-500" /> },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-gradient-to-br from-blue-100 to-indigo-100 p-8 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
            >
              {feature.icon}
              <h3 className="text-xl font-bold text-gray-700 mt-4">{feature.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-indigo-100 via-blue-50 to-white">
        <h2 className="text-center text-4xl font-bold text-gray-800 mb-12">
          About Smart City Application
        </h2>
        <div className="text-center max-w-4xl mx-auto text-lg text-gray-600">
          <p>
            The Smart City Application is designed to provide seamless and intelligent management of urban
            systems. It integrates real-time data from traffic sensors, energy grids, security systems, and environmental sensors.
            It optimizes resources, reduces congestion, and enhances the overall quality of life for residents.
          </p>
          <p className="mt-6">
            By leveraging IoT (Internet of Things), data analytics, and cloud technologies, we ensure that all services,
            including waste management, transportation, energy usage, and governance, work in harmony for a cleaner,
            safer, and more efficient city.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <h2 className="text-center text-4xl font-bold text-gray-800 mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-10 md:px-20">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold text-blue-500">Real-Time Monitoring</h3>
            <p className="mt-4 text-gray-600">
              Get real-time updates on traffic, weather, and energy consumption to make better decisions.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold text-indigo-500">Integrated Solutions</h3>
            <p className="mt-4 text-gray-600">
              Seamlessly integrate all aspects of city management for a connected experience.
            </p>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-20 bg-gradient-to-b from-indigo-100 to-white">
        <h2 className="text-center text-4xl font-bold text-gray-800 mb-12">
          Powered by Innovative Technologies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-10 md:px-20">
          {[
            { title: "IoT Sensors", description: "For data collection and monitoring", icon: <FaDatabase className="text-6xl text-teal-500" /> },
            { title: "AI Analytics", description: "For smart decision-making", icon: <FaChartBar className="text-6xl text-yellow-500" /> },
            { title: "Cloud Computing", description: "For secure and scalable infrastructure", icon: <FaHome className="text-6xl text-green-500" /> },
          ].map((tech, index) => (
            <div key={index} className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300">
              {tech.icon}
              <h3 className="text-xl font-bold text-gray-700 mt-4">{tech.title}</h3>
              <p className="mt-4 text-gray-600">{tech.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-100 text-center text-gray-600">
        <p>&copy; 2024 SmartCity. Empowering smart living for a better tomorrow.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
