import React from "react";
import { Link } from "react-router-dom";

/**
 * Component to display a summary card for a venue.
 * Shows image, name, description, price, rating, location, and meta features.
 *
 * @param {Object} props
 * @param {Object} props.venue - Venue object containing data to display.
 * @param {string} props.venue.id - Unique ID of the venue.
 * @param {string} props.venue.name - Name of the venue.
 * @param {string} props.venue.description - Description text of the venue.
 * @param {Array} props.venue.media - Array of media objects (with url and alt).
 * @param {number} props.venue.price - Price for the venue.
 * @param {number} props.venue.rating - Average rating of the venue.
 * @param {Object} props.venue.location - Location object with city and country.
 * @param {Object} props.venue.meta - Meta information about the venue (wifi, parking, etc).
 *
 * @returns {JSX.Element} Venue card UI.
 */

const VenueCard = ({ venue }) => {
  const { id, name, description, media, price, rating, location, meta } = venue;

  return (
    <Link to={`/venues/${id}`} className="block">
      <div className="bg-[#f8f8f8]  text-gray-900  border-gray-200 rounded shadow-md p-4 w-full h-full  hover:shadow-lg transition-shadow ">
        <img
          src={
            media[0]?.url ||
            "https://cdn.pixabay.com/photo/2022/09/06/14/40/beach-7436794_1280.jpg"
          }
          alt={media[0]?.alt || "Venue Image"}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <h3 className="text-xl font-semibold  break-words line-clamp-3">
          {name}
        </h3>
        <p className="text-gray-700 mt-2 break-words line-clamp-4">
          {description}
        </p>
        <p className="text-gray-900 font-semibold mt-2">Price: ${price}</p>
        <p className="text-gray-900 mt-1">
          <span className="font-semibold">Rating:</span> {rating} ⭐
        </p>
        <p className="text-gray-500 mt-1">
          <strong>Location:</strong> {location.city}, {location.country}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {meta.wifi && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
              Wi-Fi
            </span>
          )}
          {meta.parking && (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
              Parking
            </span>
          )}
          {meta.breakfast && (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
              Breakfast
            </span>
          )}
          {meta.pets && (
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
              Pets Allowed
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default VenueCard;
