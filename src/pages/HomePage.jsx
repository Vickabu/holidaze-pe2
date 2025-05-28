import React from "react";
import VenueGrid from "../components/venues/VenueGrid";

const HomePage = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 mt-10">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        Explore Our Venues
      </h1>

      <VenueGrid />
    </div>
  );
};

export default HomePage;
