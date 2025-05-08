import { doFetch } from "../api/doFetch";
import { API_HOLIDAZE } from "../api/constant";

export default function VenueDashCard({ venue, onDelete }) {
  const image =
    venue.media?.[0]?.url ||
    "https://cdn.pixabay.com/photo/2022/09/06/14/40/beach-7436794_1280.jpg";

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Er du sikker på at du vil slette "${venue.name}"?`
    );
    if (!confirmDelete) return;

    try {
      const accessToken = localStorage.getItem("accessToken");
      await doFetch(`${API_HOLIDAZE.VENUES}/${venue.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      alert("Venue slettet.");
      onDelete?.(); // Trigger refresh
    } catch (err) {
      alert("Kunne ikke slette venue: " + (err.errors?.[0]?.message || err.message));
    }
  };

  return (
    <li className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden flex flex-col md:flex-row">
      <img
        src={image}
        alt={venue.name}
        className="w-full md:w-64 h-48 object-cover"
      />
      <div className="p-4 flex-1">
        <h3 className="text-lg font-bold">{venue.name}</h3>
        <p className="text-gray-600">
          {venue.location?.city}, {venue.location?.country}
        </p>
        <p className="mt-1">Pris: {venue.price} NOK</p>
        <p>Kapasitet: {venue.maxGuests} gjester</p>
        {venue.meta && (
          <p className="text-sm text-gray-500 mt-1">
            {venue.meta.wifi && "📶 Wifi "}
            {venue.meta.parking && "🚗 Parkering "}
            {venue.meta.breakfast && "🥐 Frokost "}
            {venue.meta.pets && "🐾 Dyr tillatt"}
          </p>
        )}
        <button
          onClick={handleDelete}
          className="mt-4 inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Slett venue
        </button>
      </div>
    </li>
  );
}
