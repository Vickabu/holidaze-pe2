import { useState } from "react";
import { usePut } from "../../hooks/usePut";
import { API_HOLIDAZE } from "../../api/constant";
import { useAuth } from "../../context/AuthContext";

export default function EditProfileForm({ onSuccess, onClose }) {
  const { user, setUser } = useAuth(); 
  const [avatarUrl, setAvatarUrl] = useState(user.avatar?.url || "");
  const [avatarAlt, setAvatarAlt] = useState(user.avatar?.alt || "");
  const [bannerUrl, setBannerUrl] = useState(user.banner?.url || "");
  const [bannerAlt, setBannerAlt] = useState(user.banner?.alt || "");
  const [bio, setBio] = useState(user.bio || "");
  const { put, loading, error } = usePut();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = user.name;
    const url = `${API_HOLIDAZE.PROFILES}/${name}`;

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
      onSuccess?.(updatedUser);
      onClose?.();
    } catch (err) {
      alert("Update profile failed: " + (err.message || err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 mb-4 text-gray-900 dark:text-gray-100">
        Rediger profil
      </h2>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Avatar URL</label>
        <input
          type="text"
          placeholder="Avatar URL"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Avatar Alt-tekst</label>
        <input
          type="text"
          placeholder="Avatar Alt-tekst"
          value={avatarAlt}
          onChange={(e) => setAvatarAlt(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Banner URL</label>
        <input
          type="text"
          placeholder="Banner URL"
          value={bannerUrl}
          onChange={(e) => setBannerUrl(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Banner Alt-tekst</label>
        <input
          type="text"
          placeholder="Banner Alt-tekst"
          value={bannerAlt}
          onChange={(e) => setBannerAlt(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Bio (maks 160 tegn)</label>
        <textarea
          placeholder="Bio (maks 160 tegn)"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={160}
          className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
          rows={4}
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-100 dark:bg-red-900 p-2 rounded-md border border-red-400 dark:border-red-700">
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
          Avbryt
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md transition-transform duration-200 hover:scale-105 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
}
