import { useState } from "react";
import { API_HOLIDAZE } from "../../api/constant";
import { useDelete } from "../../hooks/useDelete";
import { confirmAndDelete } from "../../utils/confirmAndDelete";
import { Link } from "react-router-dom";
import Modal from "../common/Modal";
import EditVenue from "./EditVenue";

export default function VenueDashCard({ venue, onDelete, onUpdate }) {
  const { remove, loading } = useDelete();
  const [isEditing, setIsEditing] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  const image =
    venue.media?.[0]?.url ||
    "https://cdn.pixabay.com/photo/2022/09/06/14/40/beach-7436794_1280.jpg";

  const handleDelete = async () => {
    const success = await confirmAndDelete({
      message: `Er du sikker på at du vil slette "${venue.name}"?`,
      url: `${API_HOLIDAZE.VENUES}/${venue.id}`,
      accessToken,
      remove,
    });

    if (success) {
      alert("Venue slettet.");
      onDelete?.();
    }
  };

  return (
    <>
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
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleDelete}
              disabled={loading}
              className={`text-white px-4 py-2 rounded ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {loading ? "Sletter..." : "Slett"}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Rediger
            </button>
          </div>
        </div>
      </li>

      <Modal show={isEditing} onClose={() => setIsEditing(false)}>
        <EditVenue
          venue={venue}
          onClose={() => setIsEditing(false)}
          onSuccess={onUpdate}
        />
      </Modal>
    </>
  );
}
