
export default function BookingCard({ booking, isUpcoming, onCancel }) {
  const venue = booking.venue;
  const image = venue?.media?.[0]?.url || "https://cdn.pixabay.com/photo/2022/09/06/14/40/beach-7436794_1280.jpg";

  return (
    <li className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
      <img src={image} alt={venue?.name} className="w-full md:w-64 h-48 object-cover" />
      <div className="p-4 flex-1">
        <h3 className="text-lg font-bold">{venue?.name || "Ukjent sted"}</h3>
        {venue?.location?.city && (
          <p className="text-gray-600">{venue.location.city}, {venue.location.country}</p>
        )}
        <p className="mt-2">
          <strong>Fra:</strong> {new Date(booking.dateFrom).toLocaleDateString()}<br />
          <strong>Til:</strong> {new Date(booking.dateTo).toLocaleDateString()}
        </p>
        <p className="mt-1">Gjester: {booking.guests}</p>
        {isUpcoming && (
          <button
            onClick={() => onCancel(booking.id)}
            className="mt-4 inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Avbestill
          </button>
        )}
      </div>
    </li>
  );
}
