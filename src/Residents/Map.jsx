import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Carousel } from "react-bootstrap";
import { FaMapMarkerAlt, FaSatellite } from "react-icons/fa";
import L from "leaflet"; // Leaflet library for custom marker

import kluImage from '../images/klu.jpg';
import markerImage from '../images/marker.jpg'; // Custom marker image

const locations = [
  {
    name: "KL University, Vaddeswaram",
    description: "A premier educational institution located in Vaddeswaram, Vijayawada.",
    images: [kluImage, kluImage],
    coordinates: [16.4535, 80.5630],
    amenities: [
      "24/7 Wi-Fi",
      "Library and Study Rooms",
      "Sports Facilities",
      "Cafeteria",
      "Hostels"
    ]
  },
  {
    name: "City Hall",
    description: "The central administrative office of the city.",
    images: [kluImage, kluImage],
    coordinates: [16.5064, 80.6480],
    amenities: [
      "Public Services",
      "Emergency Response",
      "City Planning Office"
    ]
  },
];

const CityMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isSatelliteView, setIsSatelliteView] = useState(false);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  // Map View with Fitting Bounds Logic
  function FitBoundsToMarkers({ locations }) {
    const map = useMap();

    useEffect(() => {
      // Calculate bounds based on the markers' positions
      const bounds = locations.map((location) => location.coordinates);
      map.fitBounds(bounds, { padding: [50, 50] });
    }, [locations, map]);

    return null;
  }

  const toggleMapView = () => {
    setIsSatelliteView(!isSatelliteView);
  };

  return (
    <div className="city-map-container flex flex-col items-center py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 animate__animated animate__fadeIn">
          Explore Smart City Locations
        </h1>
        <p className="text-lg text-gray-700 mt-2 animate__animated animate__fadeIn animate__delay-1s">
          Click on any location on the map to discover more details.
        </p>
      </div>

      {/* Toggle Button for Satellite View */}
      <div className="mb-4">
        <button
          onClick={toggleMapView}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all duration-300"
        >
          <FaSatellite className="inline-block mr-2" />
          {isSatelliteView ? "Switch to Standard View" : "Switch to Satellite View"}
        </button>
      </div>

      {/* Map Section */}
      <div className="map-section mb-8" style={{ height: "400px", width: "100%" }}>
        <MapContainer
          center={[16.4535, 80.5630]} // Default center (KL University, Vaddeswaram)
          zoom={13}
          style={{ width: "100%", height: "100%" }}
        >
          {/* Tile Layer for Standard View (OpenStreetMap) */}
          <TileLayer
            url={isSatelliteView
              ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" // Esri Satellite
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // OpenStreetMap
            }
          />

          {/* Fit Bounds To All Markers */}
          <FitBoundsToMarkers locations={locations} />

          {/* Markers for Locations */}
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={location.coordinates}
              icon={L.icon({
                iconUrl: markerImage, // Custom marker image
                iconSize: [32, 32], // Marker size
                iconAnchor: [16, 32], // Position of the icon's anchor point
                popupAnchor: [0, -32], // Popup position
              })}
              eventHandlers={{
                click: () => handleLocationClick(location),
              }}
            >
              <Popup>
                <div className="text-xl font-semibold">
                  <FaMapMarkerAlt className="inline-block mr-2 text-blue-500 animate__animated animate__pulse" />
                  {location.name}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Location Details Section */}
      {selectedLocation && (
        <div className="location-details mt-8 p-6 border rounded-lg shadow-lg bg-white transition-all duration-500 transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">{selectedLocation.name}</h2>
          <p className="text-lg text-gray-700 mb-4">{selectedLocation.description}</p>

          {/* Image Carousel */}
          <div className="image-carousel mt-4" style={{ maxWidth: '500px' }}>
            <Carousel className="rounded-lg shadow-lg">
              {selectedLocation.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-full rounded-lg shadow-lg"
                    src={kluImage} // Adjust path as needed
                    alt={`${selectedLocation.name} ${index + 1}`}
                    style={{ maxHeight: '300px', objectFit: 'cover' }}
                  />
                  <Carousel.Caption>
                    <h3 className="text-xl font-semibold">{`${selectedLocation.name} Image ${index + 1}`}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          {/* Amenities */}
          <div className="amenities mt-6">
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">Amenities</h3>
            <ul className="list-disc pl-5">
              {selectedLocation.amenities.map((amenity, index) => (
                <li key={index} className="text-lg text-gray-700">{amenity}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CityMap;
