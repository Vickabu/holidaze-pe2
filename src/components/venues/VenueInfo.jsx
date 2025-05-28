import React from "react";

/**
 * Component displaying detailed information about a venue.
 *
 * @param {Object} props
 * @param {Object} props.venue - Venue data object.
 * @returns {JSX.Element}
 */
const VenueInfo = ({ venue }) => {
  const { description, price, rating, maxGuests, location, meta } = venue;

  const fullAddress = `${location.address}, ${location.zip} ${location.city}, ${location.country}`;

  return (
    <div className="text-gray-800 ">
      <p className="text-base leading-relaxed">{description}</p>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm font-semibold">
        <div>
          <p>
            <span className="font-semibold">Price per night:</span> ${price}
          </p>
          <p>
            <span className="font-semibold">Rating:</span> {rating} ⭐
          </p>
          <p>
            <span className="font-semibold">Max guests:</span> {maxGuests}
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold">Address:</span>
            <br />
            {location.address}, {location.zip} {location.city},{" "}
            {location.country}
          </p>
          <p>
            <span className="font-semibold">Continent:</span>{" "}
            {location.continent}
          </p>

          {location.address && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-1 text-blue-600 hover:underline"
            >
              📍 View on map
            </a>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {meta.wifi && (
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
            Wi-Fi
          </span>
        )}
        {meta.parking && (
          <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
            Parking
          </span>
        )}
        {meta.breakfast && (
          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">
            Breakfast
          </span>
        )}
        {meta.pets && (
          <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
            Pets allowed
          </span>
        )}
      </div>
    </div>
  );
};

export default VenueInfo;
