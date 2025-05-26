import React, { useState } from "react";
import { API_HOLIDAZE } from "../../api/constant";
import { usePost } from "../../hooks/usePost";

const VenueBookingForm = ({ venue }) => {
  const [bookingData, setBookingData] = useState({
    dateFrom: "",
    dateTo: "",
    guests: 1,
  });
  const { post, loading, error } = usePost();
  const [bookingMessage, setBookingMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBookingMessage(null);

    try {
      await post(API_HOLIDAZE.BOOKINGS, {
        ...bookingData,
        venueId: venue.id,
      });
      setBookingMessage({ type: "success", text: "Booking successful!" });
      setBookingData({ dateFrom: "", dateTo: "", guests: 1 }); 
    } catch (error) {
      setBookingMessage({
        type: "error",
        text: error?.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg mt-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">
        Book this venue
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-1" htmlFor="dateFrom">
            From date
          </label>
          <input
            type="date"
            name="dateFrom"
            id="dateFrom"
            value={bookingData.dateFrom}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="dateTo">
            To date
          </label>
          <input
            type="date"
            name="dateTo"
            id="dateTo"
            value={bookingData.dateTo}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="guests">
            Number of guests
          </label>
          <input
            type="number"
            name="guests"
            id="guests"
            value={bookingData.guests}
            onChange={handleChange}
            min="1"
            max={venue.maxGuests}
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? "Sending..." : "Send booking"}
        </button>
      </form>

      {bookingMessage && (
        <p
          className={`mt-6 p-3 rounded ${
            bookingMessage.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          } text-center font-semibold`}
        >
          {bookingMessage.text}
        </p>
      )}

      {error && !bookingMessage && (
        <p className="mt-6 p-3 rounded bg-red-100 text-red-800 text-center font-semibold">
          {error.message || "Something went wrong."}
        </p>
      )}
    </div>
  );
};

export default VenueBookingForm;
