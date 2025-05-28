import { useState } from "react";
import { API_HOLIDAZE } from "../../api/constant";
import { useDelete } from "../../hooks/useDelete";
import { confirmAndDelete } from "../../utils/confirmAndDelete";
import Modal from "../common/Modal";
import EditVenue from "./EditVenue";
import { Link } from "react-router-dom";
import {
  MapPin,
  CalendarDays,
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
  const [showBookings, setShowBookings] = useState(false); // 👈 ny state
  const accessToken = localStorage.getItem("accessToken");

  const image =
    venue.media?.[0]?.url ||
    "https://cdn.pixabay.com/photo/2022/09/06/14/40/beach-7436794_1280.jpg";

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
      <li className="group relative bg-white  rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
        <Link to={`/venues/${venue.id}`} className="block">
          <img
            src={image}
            alt={venue.name}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-md font-semibold truncate">{venue.name}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-500 ">
              <MapPin className="w-4 h-4" />
              <span>
                {venue.location?.city}, {venue.location?.country}
              </span>
            </div>
            <div className="text-sm mt-2 flex items-center gap-2 text-gray-600 ">
              <span>💰 {venue.price} NOK</span>
              <Users className="w-4 h-4" />
              <span>{venue.maxGuests}</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setShowBookings(true);
              }}
              className="mt-2 text-sm text-blue-600 hover:underline flex items-center gap-1"
            >
              <CalendarDays className="w-4 h-4" />
              {venue._count?.bookings || 0} bookings
            </button>

            <div className="text-xs mt-1 flex gap-2 text-gray-500  flex-wrap">
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

      {/* Modal for Edit Venue */}
      <Modal show={isEditing} onClose={() => setIsEditing(false)}>
        <EditVenue
          venue={venue}
          onClose={() => setIsEditing(false)}
          onSuccess={onUpdate}
        />
      </Modal>

      {/* ✅ Modal for Bookings */}
      <Modal show={showBookings} onClose={() => setShowBookings(false)}>
        <h2 className="text-xl font-semibold mb-4">{venue.name} – Bookings</h2>
        {venue.bookings?.length > 0 ? (
          <ul className="space-y-4">
            {venue.bookings.map((booking) => (
              <li
                key={booking.id}
                className="flex items-center gap-4 border-b pb-2"
              >
                <img
                  src={
                    booking.customer.avatar?.url ||
                    "https://via.placeholder.com/40"
                  }
                  alt={booking.customer.avatar?.alt || "Customer avatar"}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{booking.customer.name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(booking.dateFrom).toLocaleDateString()} →{" "}
                    {new Date(booking.dateTo).toLocaleDateString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings yet.</p>
        )}
      </Modal>
    </>
  );
}
