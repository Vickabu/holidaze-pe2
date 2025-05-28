import { useState } from "react";
import Modal from "../common/Modal";
import EditProfileForm from "./EditProfileForm";
import { useAuth } from "../../context/AuthContext";

/**
 * Displays the user's profile information with option to edit it in a modal.
 *
 * @returns {JSX.Element} User profile card with edit modal.
 */
export default function UserInfoCard() {
  const [isEditing, setIsEditing] = useState(false);
  const { user, setUser } = useAuth();

  const handleClose = () => setIsEditing(false);

  const handleSuccess = (updatedProfile) => {
    setUser((prev) => ({
      ...prev,
      ...updatedProfile,
    }));
    setIsEditing(false);
  };

  return (
    <div
      className="bg-white rounded shadow-md overflow-hidden mx-auto"
      aria-label="User profile card"
    >
      {user.banner?.url && (
        <div
          className="h-80 bg-cover bg-center"
          style={{ backgroundImage: `url(${user.banner.url})` }}
          role="img"
          aria-label={user.banner.alt || "User banner"}
        />
      )}

      <div className="p-6 flex items-center gap-6">
        <img
          src={user.avatar?.url || "/default-avatar.png"}
          alt={user.avatar?.alt || "User avatar"}
          className="w-24 h-24 rounded-full object-cover border-4 border-white -mt-16"
          style={{ zIndex: 10, position: "relative" }}
        />

        <div className="flex-1">
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="text-gray-600">{user.email}</p>
          <p className="mt-2 text-gray-700 ">{user.bio}</p>
          <p className="mt-2 text-sm font-medium text-blue-600 ">
            Role: {user.venueManager ? "Venue Manager" : "Customer"}
          </p>
        </div>
      </div>

      <div className="p-6 pt-0 flex justify-end">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
          aria-haspopup="dialog"
        >
          Update profile
        </button>
      </div>

      <Modal
        show={isEditing}
        onClose={handleClose}
        aria-label="Edit profile modal"
      >
        <EditProfileForm
          user={user}
          onSuccess={handleSuccess}
          onClose={handleClose}
        />
      </Modal>
    </div>
  );
}
