import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { API_HOLIDAZE } from "../api/constant";

const SellerPublicProfile = () => {
  const { username } = useParams();

  const {
    data: user,
    loading,
    error,
  } = useFetch(`${API_HOLIDAZE.PROFILES}/${username}?_venues=true`);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Could not fetch profile..: {error.message}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar?.url}
            alt={user?.avatar?.alt || user.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2 mt-4">Venues</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {user.venues.map((venue) => (
            <div key={venue.id} className="bg-gray-100 p-4 rounded shadow">
              <h3 className="text-lg font-bold">{venue.name}</h3>
              <p className="text-gray-700">
                {venue.location.city}, {venue.location.country}
              </p>
              <p className="text-sm text-gray-500">
                Price per night: ${venue.price}
              </p>
              <a
                href={`/venues/${venue.id}`}
                className="text-[#1F3B3C] hover:underline text-sm mt-2 inline-block"
              >
                See more details
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerPublicProfile;
