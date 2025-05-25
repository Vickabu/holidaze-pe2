import React from "react";

const VenueInfo = ({ venue }) => {
  return (
    <div>
      <p className="text-gray-700">{venue.description}</p>
      <p className="mt-2">
        <strong>Pris per natt:</strong> ${venue.price}
      </p>
      <p>
        <strong>Rating:</strong> {venue.rating} ⭐
      </p>
      <p>
        <strong>Maks gjester:</strong> {venue.maxGuests}
      </p>

      <div className="mt-4 space-y-1">
        <p>
          <strong>Adresse:</strong>{" "}
          {venue.location.address}, {venue.location.zip} {venue.location.city},{" "}
          {venue.location.country}
        </p>
        <p>
          <strong>Kontinent:</strong> {venue.location.continent}
        </p>

        {venue.location.address && (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${venue.location.address}, ${venue.location.zip} ${venue.location.city}, ${venue.location.country}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            📍 Se på kart
          </a>
        )}
      </div>

      <div className="mt-4 space-x-2">
        {venue.meta.wifi && <span className="badge">Wi-Fi</span>}
        {venue.meta.parking && <span className="badge">Parkering</span>}
        {venue.meta.breakfast && <span className="badge">Frokost</span>}
        {venue.meta.pets && <span className="badge">Kjæledyr tillatt</span>}
      </div>
    </div>
  );
};

export default VenueInfo;
