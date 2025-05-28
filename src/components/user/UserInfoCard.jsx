import { useState } from "react";
import Modal from "../common/Modal";
import EditProfileForm from "./EditProfileForm";
import { useAuth } from "../../context/AuthContext";

/**
 * UserInfoCard component displays the authenticated user's profile details,
 * including their banner image, avatar, name, email, bio, and role.
 * It also allows the user to edit their profile via a modal form.
 *
 * @component
 *
 * @returns {JSX.Element} A styled card displaying user information with an "Update profile" button.
 *
 * @example
 * // Renders user profile card with edit functionality:
 * <UserInfoCard />
 *
 * @remarks
 * This component uses `useAuth` from context to retrieve and update user data,
 * and includes a modal that renders the `EditProfileForm`.
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
          className="md:h-80 h-42 bg-cover bg-center"
          style={{ backgroundImage: `url(${user.banner.url})` }}
          role="img"
          aria-label={user.banner.alt || "User banner"}
        />
      )}

      <div className="p-6 flex items-center gap-6">
        <img
          src={user.avatar?.url || "/default-avatar.png"}
          alt={user.avatar?.alt || "User avatar"}
          className="w-24 h-24 rounded-full object-cover border-2 border-white -mt-28"
          style={{ zIndex: 10, position: "relative" }}
        />

        <div className="flex-1">
          <p className="text-xl font-bold">{user.name}</p>
          <p className="text-gray-600">{user.email}</p>
          <p className="mt-2 text-gray-700 text-lg">{user.bio}</p>
          <p className="mt-2 text-sm font-medium text-[#bg-[#1F3B3C]] ">
            {user.venueManager ? "Venue Manager" : "Customer"}
          </p>
        </div>
      </div>

      <div className="p-6 pt-0 flex justify-end">
        <button
          onClick={() => setIsEditing(true)}
          className="hover:bg-[#2b4a4b] bg-[#1F3B3C] hover:shadow-md text-white px-5 py-2 rounded transition"
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
