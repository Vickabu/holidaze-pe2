import React from "react";

const VenueInfo = ({ venue }) => {
  return (
    <div className="text-gray-800 dark:text-gray-200">
      <p className="text-base leading-relaxed">{venue.description}</p>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm font-semibold">
        <div>
          <p>
            <span className="font-semibold">Price per night:</span> ${venue.price}
          </p>
          <p>
            <span className="font-semibold">Rating:</span> {venue.rating} ⭐
          </p>
          <p>
            <span className="font-semibold">Max guests:</span> {venue.maxGuests}
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold">Address:</span><br />
            {venue.location.address}, {venue.location.zip} {venue.location.city}, {venue.location.country}
          </p>
          <p>
            <span className="font-semibold">Continent:</span> {venue.location.continent}
          </p>
          {venue.location.address && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${venue.location.address}, ${venue.location.zip} ${venue.location.city}, ${venue.location.country}`
              )}`}
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
        {venue.meta.wifi && (
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
            Wi-Fi
          </span>
        )}
        {venue.meta.parking && (
          <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
            Parking
          </span>
        )}
        {venue.meta.breakfast && (
          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">
            Breakfast
          </span>
        )}
        {venue.meta.pets && (
          <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
            Pets allowed
          </span>
        )}
      </div>
    </div>
  );
};

export default VenueInfo;
