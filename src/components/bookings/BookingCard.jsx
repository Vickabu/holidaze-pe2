import { API_HOLIDAZE } from "../../api/constant";
import { useDelete } from "../../hooks/useDelete";
import { confirmAndDelete } from "../../utils/confirmAndDelete";

export default function BookingCard({ booking, isUpcoming, onRefresh }) {
  const venue = booking.venue;
  const accessToken = localStorage.getItem("accessToken");
  const { remove, loading } = useDelete();

  const image =
    venue?.media?.[0]?.url ||
    "https://cdn.pixabay.com/photo/2022/09/06/14/40/beach-7436794_1280.jpg";

  const handleCancel = async () => {
    const success = await confirmAndDelete({
      message: "Er du sikker på at du vil avbestille?",
      url: `${API_HOLIDAZE.BOOKINGS}/${booking.id}`,
      accessToken,
      remove,
    });

    if (success) {
      alert("Booking avbestilt!");
      onRefresh();
    }
  };

  return (
    <li className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
      <img src={image} alt={venue?.name} className="w-full md:w-64 h-48 object-cover" />
      <div className="p-4 flex-1">
        <h3 className="text-lg font-bold">{venue?.name || "Ukjent sted"}</h3>
        {venue?.location?.city && (
          <p className="text-gray-600">
            {venue.location.city}, {venue.location.country}
          </p>
        )}
        <p className="mt-2">
          <strong>Fra:</strong> {new Date(booking.dateFrom).toLocaleDateString()}
          <br />
          <strong>Til:</strong> {new Date(booking.dateTo).toLocaleDateString()}
        </p>
        <p className="mt-1">Gjester: {booking.guests}</p>
        {isUpcoming && (
          <button
            onClick={handleCancel}
            disabled={loading}
            className={`mt-4 inline-block px-4 py-2 rounded text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {loading ? "Avbestiller..." : "Avbestill"}
          </button>
        )}
      </div>
    </li>
  );
}
