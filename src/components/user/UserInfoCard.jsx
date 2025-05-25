import { useState } from "react";
import Modal from "../common/Modal";
import EditProfileForm from "./EditProfileForm";
import { useAuth } from "../../context/AuthContext";

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
    <div>
      <div className="flex items-center gap-4 mb-6">
        <img
          src={user.avatar?.url}
          alt={user.avatar?.alt || "Brukeravatar"}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{user.name}</p>
          <p>{user.email}</p>
          <p>{user.bio}</p>
          <p>Rolle: {user.venueManager ? "Venue Manager" : "Customer"}</p>
        </div>
      </div>

      <button
        onClick={() => setIsEditing(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Rediger profil
      </button>

      <Modal show={isEditing} onClose={handleClose}>
        <EditProfileForm
          user={user}
          onSuccess={handleSuccess}
          onClose={handleClose}
        />
      </Modal>
    </div>
  );
}
