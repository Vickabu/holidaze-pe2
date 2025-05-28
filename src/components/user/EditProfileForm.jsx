import { useState } from "react";
import { usePut } from "../../hooks/usePut";
import { API_HOLIDAZE } from "../../api/constant";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

/**
 * Form component for editing the user's profile.
 *
 * @param {Object} props
 * @param {function} [props.onSuccess] - Callback invoked with updated user data after successful update.
 * @param {function} [props.onClose] - Callback to close the form/modal.
 * @returns {JSX.Element} Edit profile form.
 */
export default function EditProfileForm({ onSuccess, onClose }) {
  const { user, setUser } = useAuth();

  // Local state for editable profile fields
  const [avatarUrl, setAvatarUrl] = useState(user.avatar?.url || "");
  const [avatarAlt, setAvatarAlt] = useState(user.avatar?.alt || "");
  const [bannerUrl, setBannerUrl] = useState(user.banner?.url || "");
  const [bannerAlt, setBannerAlt] = useState(user.banner?.alt || "");
  const [bio, setBio] = useState(user.bio || "");

  const { put, loading, error } = usePut();

  /**
   * Handles form submission to update user profile.
   * Sends PUT request and updates context and local storage on success.
   *
   * @param {React.FormEvent} e - Form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${API_HOLIDAZE.PROFILES}/${user.name}`;

    const updatedProfile = {
      bio,
      avatar: {
        url: avatarUrl,
        alt: avatarAlt,
      },
      banner: {
        url: bannerUrl,
        alt: bannerAlt,
      },
    };

    try {
      await put(url, updatedProfile);

      const updatedUser = {
        ...user,
        ...updatedProfile,
      };

      setUser(updatedUser);
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));

      toast.success("Profile updated!");

      if (onSuccess) onSuccess(updatedUser);
      if (onClose) onClose();
    } catch (err) {
      toast.error(
        "Update failed: " +
          (err.errors?.[0]?.message || err.message || "Unknown error"),
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto space-y-6 p-6 rounded shadow-lg"
      aria-label="Edit profile form"
    >
      <h2 className="text-2xl font-semibold border-b border-gray-300 pb-2 mb-4 text-gray-900">
        Edit Profile
      </h2>

      <div>
        <label
          htmlFor="avatarUrl"
          className="block text-sm font-medium mb-1 text-gray-700"
        >
          Avatar URL
        </label>
        <input
          id="avatarUrl"
          type="text"
          placeholder="Avatar URL"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          className="w-full p-3 rounded border border-gray-300  bg-white text-gray-900  focus:outline-none focus:ring-2 focus:ring-[#1F3B3C] transition"
        />
      </div>

      <div>
        <label
          htmlFor="avatarAlt"
          className="block text-sm font-medium mb-1 text-gray-700 "
        >
          Avatar Alt Text
        </label>
        <input
          id="avatarAlt"
          type="text"
          placeholder="Avatar Alt Text"
          value={avatarAlt}
          onChange={(e) => setAvatarAlt(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300  bg-white  text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1F3B3C] transition"
        />
      </div>

      <div>
        <label
          htmlFor="bannerUrl"
          className="block text-sm font-medium mb-1 text-gray-700 "
        >
          Banner URL
        </label>
        <input
          id="bannerUrl"
          type="text"
          placeholder="Banner URL"
          value={bannerUrl}
          onChange={(e) => setBannerUrl(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300  bg-white  text-gray-900  focus:outline-none focus:ring-2 focus:ring-[#1F3B3C] transition"
        />
      </div>

      <div>
        <label
          htmlFor="bannerAlt"
          className="block text-sm font-medium mb-1 text-gray-700 "
        >
          Banner Alt Text
        </label>
        <input
          id="bannerAlt"
          type="text"
          placeholder="Banner Alt Text"
          value={bannerAlt}
          onChange={(e) => setBannerAlt(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300  bg-white  text-gray-900  focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div>
        <label
          htmlFor="bio"
          className="block text-sm font-medium mb-1 text-gray-700 "
        >
          Bio (max 160 characters)
        </label>
        <textarea
          id="bio"
          placeholder="Bio (max 160 characters)"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={160}
          className="w-full p-3 rounded-md border border-gray-300  bg-white  text-gray-900  focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
          rows={4}
        />
      </div>

      {error && (
        <p
          className="text-red-500 text-sm bg-red-100 p-2 rounded-md border border-red-400 "
          role="alert"
        >
          {error}
        </p>
      )}

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-md transition"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[#1F3B3C] hover:bg-[#274546] text-white px-6 py-2 rounded-md shadow-md transition-transform duration-200 hover:scale-105 disabled:opacity-50"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
}
