import React from "react";
import VenueGrid from "../components/venues/VenueGrid";

const HomePage = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 mt-10">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        Welcome!
      </h1>
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Explore Our Venues
      </h2>

      <VenueGrid />
    </div>
  );
};

export default HomePage;
