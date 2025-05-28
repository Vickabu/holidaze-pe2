import React from "react";
import VenueGrid from "../components/venues/VenueGrid"; 
import ColorDemo from "../components/ColorDemo"; 

const HomePage = () => {
  return (
      <div className="max-w-screen-xl mx-auto px-4 mt-10">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8 dark:text-white">
          Explore Our Venues
        </h1>

        {/* <ColorDemo /> */}

        <VenueGrid />
      </div>

  );
};

export default HomePage;