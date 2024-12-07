import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBus, FaMapMarkedAlt, FaPhoneAlt, FaCloudSun } from "react-icons/fa";
import axios from "axios";

const CityResourcesPage = () => {
  const [city, setCity] = useState("Rayagada"); // Default city
  const [weatherData, setWeatherData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [inputCity, setInputCity] = useState(city); // For input field

  useEffect(() => {
    // Fetch the weather data for the city
    const fetchWeatherData = async () => {
      try {
        const apiKey = "a49e8e83381f5bccf9aaaa15a12624ed&units=metric"; // Replace with your OpenWeatherMap API Key
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        const currentWeatherResponse = await axios.get(currentWeatherUrl);
        const forecastResponse = await axios.get(forecastUrl);

        setWeatherData(currentWeatherResponse.data);
        setForecastData(forecastResponse.data.list.slice(0, 5)); // Upcoming 5 days forecast

      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  // Handle city name input change
  const handleCityInputChange = (event) => {
    setInputCity(event.target.value);
  };

  // Handle search button click
  const handleSearch = () => {
    setCity(inputCity);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-300 flex flex-col py-10 px-4">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-7xl mx-auto flex flex-col gap-8">

        {/* City Input Field */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={inputCity}
            onChange={handleCityInputChange}
            className="border-2 border-indigo-500 rounded-md px-4 py-2 text-lg mr-2"
            placeholder="Enter city name"
          />
          <button
            onClick={handleSearch}
            className="bg-indigo-500 text-white px-6 py-2 rounded-md hover:bg-indigo-600 transition duration-300"
          >
            Search
          </button>
        </div>

        {/* Weather Information */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-indigo-500 mb-4 flex items-center gap-2">
            <FaCloudSun className="text-indigo-600" />
            Weather Forecast
          </h3>

          {/* Current Weather */}
          {weatherData.main && (
            <div className="mb-4 text-center">
              <h4 className="text-xl font-semibold text-gray-700">
                Current Temperature: {weatherData.main.temp}°C
              </h4>
              <p className="text-gray-600">{weatherData.weather[0].description}</p>
            </div>
          )}

          {/* 5 Days Forecast */}
          <h4 className="text-lg font-semibold text-indigo-500 mb-2">Next 5 Days Forecast</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
  {forecastData.map((day, index) => (
    <div key={index} className="p-4 bg-indigo-100 rounded-lg shadow-md text-center">
      {/* Custom Date Format */}
      <p className="text-indigo-600 font-semibold">
        {new Date(day.dt * 1000).toLocaleDateString('en-GB')}
      </p>
      
      {/* Weather Temperature */}
      <p className="text-gray-700 text-xl">{day.main.temp}°C</p>
      <p className="text-gray-500">{day.weather[0].description}</p>
      
      {/* Additional Weather Information */}
      <div className="mt-4">
        <p className="text-gray-600">Humidity: {day.main.humidity}%</p>
        <p className="text-gray-600">Wind: {day.wind.speed} m/s</p>
        <p className="text-gray-600">Pressure: {day.main.pressure} hPa</p>
        
        {/* Weather Icon */}
        <img
          src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
          alt={day.weather[0].description}
          className="mx-auto mt-2"
        />
      </div>
    </div>
  ))}
</div>

        </div>

        {/* City Resources Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Public Transportation */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-indigo-500 mb-4 flex items-center gap-2">
              <FaBus className="text-indigo-600" />
              Public Transportation
            </h3>
            <p className="text-gray-700 mb-2">
              <strong>Bus Routes:</strong> Route 1, Route 2, Route 3
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Train Timings:</strong> Trains operate from <span className="text-indigo-500">9:00 AM to 6:00 PM</span>
            </p>
          </div>

          {/* City Maps */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-indigo-500 mb-4 flex items-center gap-2">
              <FaMapMarkedAlt className="text-indigo-600" />
              City Maps
            </h3>
            <p className="text-gray-700 mb-4">
              Explore detailed maps of the city for navigation and services. You can{' '}
              <a
                href="/path/to/city-map.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 font-semibold underline"
              >
                download the city map (PDF)
              </a>.
            </p>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-indigo-500 mb-4 flex items-center gap-2">
              <FaPhoneAlt className="text-indigo-600" />
              Emergency Contacts
            </h3>
            <p className="text-gray-700 mb-2">
              <strong>Police:</strong> 100
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Ambulance:</strong> 102
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Fire Department:</strong> 101
            </p>
          </div>

        </div>

        {/* Navigation Option */}
        <Link
          to="/resident-dashboard"
          className="w-full py-3 bg-gray-500 text-white font-bold rounded-md shadow-md transform hover:scale-105 transition duration-300 text-center block"
        >
          Back to User Dashboard
        </Link>
      </div>
    </div>
  );
};

export default CityResourcesPage;
