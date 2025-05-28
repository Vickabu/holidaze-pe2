import { API_HOLIDAZE } from "../../api/constant";
import { useDelete } from "../../hooks/useDelete";
import { confirmAndDelete } from "../../utils/confirmAndDelete";
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

/**
 * BookingCard displays a single booking with venue details, dates, and number of guests.
 * For upcoming bookings, it provides a "Cancel" button with confirmation.
 * Clicking on the card navigates to the venue details page.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.booking - Booking object containing venue, dates, guests, and ID.
 * @param {boolean} props.isUpcoming - Indicates whether the booking is in the future.
 * @param {Function} props.onRefresh - Callback to refresh the booking list after cancellation.
 *
 * @returns {JSX.Element} The rendered booking card.
 */

export default function BookingCard({ booking, isUpcoming, onRefresh }) {
  const venue = booking.venue;
  const accessToken = localStorage.getItem("accessToken");
  const { remove, loading } = useDelete();
  const navigate = useNavigate();

  const image =
    venue?.media?.[0]?.url ||
    "https://cdn.pixabay.com/photo/2022/09/06/14/40/beach-7436794_1280.jpg";

  const handleCancel = async (e) => {
    e.stopPropagation();
    const success = await confirmAndDelete({
      message: "Are you sure you want to cancel?",
      url: `${API_HOLIDAZE.BOOKINGS}/${booking.id}`,
      accessToken,
      remove,
      onConfirm: async (msg) => {
        return window.confirm(msg);
      },
      onError: (errorMessage) => {
        toast.error(errorMessage);
      },
    });

    if (success) {
      toast.success("Booking canceled!");
      onRefresh();
    }
  };

  const goToVenue = () => {
    if (venue?.id) {
      navigate(`/venues/${venue.id}`);
    }
  };

  return (
    <li
      onClick={goToVenue}
      className="cursor-pointer bg-[#f8f8f8] rounded shadow-md flex flex-col transition-transform duration-300  hover:shadow-xl"
    >
      <img
        src={image}
        alt={venue?.name}
        className="w-full h-40 object-cover rounded-t"
      />
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            {venue?.name || "Unknown Location"}
          </h3>
          {venue?.location?.city && (
            <p className="flex items-center text-gray-600 mb-2">
              <FaMapMarkerAlt className="mr-2 " />
              {venue.location.city}, {venue.location.country}
            </p>
          )}
          <p className="flex items-center text-gray-700 mb-1">
            <FaCalendarAlt className="mr-2 " />
            <span>
              <strong>From:</strong>{" "}
              {new Date(booking.dateFrom).toLocaleDateString()}
            </span>
          </p>
          <p className="flex items-center text-gray-700 mb-1">
            <FaCalendarAlt className="mr-2" />
            <span>
              <strong>To:</strong>{" "}
              {new Date(booking.dateTo).toLocaleDateString()}
            </span>
          </p>
          <p className="flex items-center text-gray-700">
            <FaUser className="mr-2 " />
            Guests: {booking.guests}
          </p>
        </div>

        {isUpcoming && (
          <button
            onClick={handleCancel}
            disabled={loading}
            className={`mt-6 py-2 rounded text-white font-semibold transition-colors duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-400"
            }`}
          >
            {loading ? "Cancelling..." : "Cancel"}
          </button>
        )}
      </div>
    </li>
  );
}
