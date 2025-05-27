import { useState } from "react";
import { API_HOLIDAZE } from "../../api/constant";
import { useDelete } from "../../hooks/useDelete";
import { confirmAndDelete } from "../../utils/confirmAndDelete";
import Modal from "../common/Modal";
import EditVenue from "./EditVenue";
import { Link } from "react-router-dom";
import {
  MapPin,
  Users,
  Wifi,
  ParkingCircle,
  Croissant,
  PawPrint,
  Pencil,
  Trash2,
} from "lucide-react";

/**
 * Component representing a card for a venue in the dashboard.
 * Displays venue info, allows editing and deleting.
 *
 * @param {Object} props
 * @param {Object} props.venue - Venue data object.
 * @param {Function} props.onDelete - Callback triggered after successful deletion.
 * @param {Function} props.onUpdate - Callback triggered after successful update.
 */
export default function VenueDashCard({ venue, onDelete, onUpdate }) {
  const { remove, loading } = useDelete();
  const [isEditing, setIsEditing] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  const image =
    venue.media?.[0]?.url ||
    "https://cdn.pixabay.com/photo/2022/09/06/14/40/beach-7436794_1280.jpg";

  /**
   * Handles venue deletion with confirmation.
   */
  const handleDelete = async () => {
    const success = await confirmAndDelete({
      message: `Are you sure you want to delete "${venue.name}"?`,
      url: `${API_HOLIDAZE.VENUES}/${venue.id}`,
      accessToken,
      remove,
    });

    if (success) {
      alert("Venue deleted.");
      onDelete?.();
    }
  };

  return (
    <>
      <li className="group relative bg-white dark:bg-gray-700 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
        <Link to={`/venues/${venue.id}`} className="block">
          <img
            src={image}
            alt={venue.name}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-md font-semibold truncate">{venue.name}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-300">
              <MapPin className="w-4 h-4" />
              <span>
                {venue.location?.city}, {venue.location?.country}
              </span>
            </div>
            <div className="text-sm mt-2 flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span>💰 {venue.price} NOK</span>
              <Users className="w-4 h-4" />
              <span>{venue.maxGuests}</span>
            </div>
            <div className="text-xs mt-1 flex gap-2 text-gray-500 dark:text-gray-300 flex-wrap">
              {venue.meta?.wifi && <Wifi className="w-4 h-4" />}
              {venue.meta?.parking && <ParkingCircle className="w-4 h-4" />}
              {venue.meta?.breakfast && <Croissant className="w-4 h-4" />}
              {venue.meta?.pets && <PawPrint className="w-4 h-4" />}
            </div>
          </div>
        </Link>

        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white p-1 rounded hover:bg-blue-700"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-500 text-white p-1 rounded hover:bg-red-600 disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
          </button>
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
