import React from "react";
import { Link } from "react-router-dom";

const VenueCard = ({ venue }) => {
  const { id, name, description, media, price, rating, location, meta } = venue;

  return (
    <Link to={`/venues/${id}`} className="block">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 w-full max-w-xs hover:shadow-lg transition-shadow">
        <img
          src={media[0]?.url}
          alt={media[0]?.alt || "Venue Image"}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl font-semibold text-gray-900 break-words">{name}</h3>
        <p className="text-gray-700 mt-2 break-words">{description}</p>
        <p className="text-gray-900 font-semibold mt-2">Price: ${price}</p>
        <p className="text-yellow-500 mt-1">
          <span className="font-semibold">Rating:</span> {rating} ⭐
        </p>
        <p className="text-gray-500 mt-1">
          <strong>Location:</strong> {location.city}, {location.country}
        </p>
        <div className="mt-3 space-x-2">
          {meta.wifi && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">Wi-Fi</span>
          )}
          {meta.parking && (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">Parking</span>
          )}
          {meta.breakfast && (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">Breakfast</span>
          )}
          {meta.pets && (
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">Pets Allowed</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default VenueCard;
