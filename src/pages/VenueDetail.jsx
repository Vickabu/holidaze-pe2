import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";
import { API_HOLIDAZE } from "../api/constant.js";
import VenueImages from "../components/venues/VenueImages.jsx";
import VenueInfo from "../components/venues/VenueInfo.jsx";
import VenueOwner from "../components/venues/VenueOwner.jsx";
import VenueBookingForm from "../components/venues/VenueBookingForm.jsx";
import { useAuth } from "../context/AuthContext";

/**
 * VenueDetail Component
 *
 * This component displays detailed information about a single venue.
 * It fetches the venue by ID, including owner and booking data.
 * It conditionally renders booking options depending on user login and manager status.
 *
 * @component
 * @returns {JSX.Element}
 */

const VenueDetail = () => {
  const { id } = useParams();
  const {
    data: venue,
    loading,
    error,
  } = useFetch(`${API_HOLIDAZE.VENUES}/${id}?_owner=true&_bookings=true`);

  const { user, setShowAuthModal, setAuthModalTab } = useAuth();

  if (loading) return <p>Loading location...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;
  if (!venue) return <p>Could not find venue</p>;

  const isVenueManager = user && venue.owner && user.name === venue.owner.name;
  const isUserLoggedIn = !!user;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-5xl font-extrabold mb-6 text-black border-b-4 border-black pb-2">
        {venue.name}
      </h1>

      <VenueImages media={venue.media} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <VenueInfo venue={venue} />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <VenueOwner owner={venue.owner} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24 self-start">
          <VenueBookingForm
            venue={venue}
            isUserLoggedIn={isUserLoggedIn}
            isVenueManager={isVenueManager}
          />

          {!isUserLoggedIn && (
            <div className="flex flex-col items-center space-y-4 mt-6">
              <h1 className="font-bold text-2xl">Booking</h1>
              <p className="text-gray-700 text-center">
                You need to be signed in to book this venue.
              </p>
              <button
                onClick={() => {
                  setAuthModalTab("login");
                  setShowAuthModal(true);
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Sign in to start booking
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VenueDetail;
