// components/VenueBookingForm.jsx
import React, { useState } from "react";
import { doFetch } from "../api/doFetch";
import { API_HOLIDAZE } from "../api/constant";

const VenueBookingForm = ({ venue }) => {
  const [bookingData, setBookingData] = useState({
    dateFrom: "",
    dateTo: "",
    guests: 1,
  });
  const [bookingMessage, setBookingMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBookingMessage(null);

    try {
      await doFetch(`${API_HOLIDAZE.BOOKINGS}`, {
        method: "POST",
        body: JSON.stringify({ ...bookingData, venueId: venue.id }),
      });

      setBookingMessage({ type: "success", text: "Booking registrert!" });
    } catch (error) {
      setBookingMessage({
        type: "error",
        text: error?.message || "Noe gikk galt. Vennligst prøv igjen.",
      });
    }
  };

  return (
    <div className="bg-white border rounded-lg p-4 shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">Book dette stedet</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Fra dato</label>
          <input
            type="date"
            name="dateFrom"
            value={bookingData.dateFrom}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Til dato</label>
          <input
            type="date"
            name="dateTo"
            value={bookingData.dateTo}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Antall gjester</label>
          <input
            type="number"
            name="guests"
            value={bookingData.guests}
            onChange={handleChange}
            min="1"
            max={venue.maxGuests}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send booking
        </button>
      </form>

      {bookingMessage && (
        <p
          className={`mt-4 p-2 rounded ${
            bookingMessage.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {bookingMessage.text}
        </p>
      )}
    </div>
  );
};

export default VenueBookingForm;
