import React from "react";
import VenueGrid from "../components/VenueGrid"; 

const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Explore Our Venues</h1>
        <VenueGrid />
      </div>
    </div>
  );
};

export default HomePage;
