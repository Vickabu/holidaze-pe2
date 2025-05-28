import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { API_HOLIDAZE } from "../../api/constant";
import { usePost } from "../../hooks/usePost";
import { isWithinInterval, parseISO, eachDayOfInterval } from "date-fns";

/**
 * VenueBookingForm Component
 *
 * Handles booking interactions for a specific venue.
 * Shows a date picker with booked dates disabled, validates date range,
 * submits the booking request, and gives user feedback.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.venue - The venue object, including existing bookings.
 * @param {boolean} props.isUserLoggedIn - Indicates if the user is logged in.
 * @param {boolean} props.isVenueManager - Indicates if the logged-in user is the manager of this venue.
 * @returns {JSX.Element}
 */

const VenueBookingForm = ({ venue, isUserLoggedIn, isVenueManager }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [guests, setGuests] = useState(1);
  const [bookingMessage, setBookingMessage] = useState(null);
  const { post, loading, error } = usePost();

  const bookedIntervals =
    venue.bookings?.map((booking) => ({
      start: parseISO(booking.dateFrom),
      end: parseISO(booking.dateTo),
    })) || [];

  const isDateBooked = (date) => {
    return bookedIntervals.some(({ start, end }) =>
      isWithinInterval(date, { start, end }),
    );
  };

  const isRangeAvailable = (range) => {
    if (!range[0] || !range[1]) return false;

    const selectedDates = eachDayOfInterval({ start: range[0], end: range[1] });
    return selectedDates.every((date) => !isDateBooked(date));
  };

  const handleDateChange = (update) => {
    if (!update[1]) {
      setDateRange(update);
      setBookingMessage(null);
      return;
    }

    if (isRangeAvailable(update)) {
      setDateRange(update);
      setBookingMessage(null);
    } else {
      setBookingMessage({
        type: "error",
        text: "Selected dates include booked days. Please choose a different period.",
      });
      setDateRange([update[0], null]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBookingMessage(null);

    if (!dateRange[0] || !dateRange[1]) {
      setBookingMessage({
        type: "error",
        text: "Please select both start and end dates.",
      });
      return;
    }

    if (!isRangeAvailable(dateRange)) {
      setBookingMessage({
        type: "error",
        text: "Selected dates include booked days.",
      });
      return;
    }

    try {
      await post(API_HOLIDAZE.BOOKINGS, {
        dateFrom: dateRange[0].toISOString().split("T")[0],
        dateTo: dateRange[1].toISOString().split("T")[0],
        guests,
        venueId: venue.id,
      });
      setBookingMessage({ type: "success", text: "Booking registered!" });
      setDateRange([null, null]);
      setGuests(1);
    } catch (error) {
      setBookingMessage({
        type: "error",
        text: error?.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="bg-white border rounded p-4 shadow  text-center">
      <h2 className="text-xl font-semibold mb-4">Book this venue</h2>

      <div className="mx-auto">
        <label className="block font-medium mb-1">Select booking period</label>
        <div className="mx-auto border rounded p-3 w-fit">
          <DatePicker
            selectsRange
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            onChange={handleDateChange}
            minDate={new Date()}
            filterDate={(date) => !isDateBooked(date)}
            dateFormat="yyyy-MM-dd"
            inline
          />
        </div>
      </div>

      {isUserLoggedIn && !isVenueManager && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block font-medium mb-1">Guests</label>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              min="1"
              max={venue.maxGuests}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white px-4 py-2 rounded bg-[#1F3B3C] hover:bg-[#274546] disabled:opacity-50"
          >
            {loading ? "Booking..." : "Book Now"}
          </button>
        </form>
      )}

      {isUserLoggedIn && isVenueManager && (
        <div className="flex flex-col items-center space-y-4 mt-6">
          <h1 className="font-bold text-2xl">Venue Manager</h1>
          <p className="text-gray-700 text-center">
            You are the venue manager for this venue.
          </p>
        </div>
      )}

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

      {error && !bookingMessage && (
        <p className="mt-4 p-2 rounded bg-red-100 text-red-700">
          {error.message || "Something went wrong."}
        </p>
      )}
    </div>
  );
};

export default VenueBookingForm;
