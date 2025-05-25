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
      alert("Oppdatering feilet: " + (err.message || err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Rediger profil</h2>

      <input
        type="text"
        placeholder="Avatar URL"
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Avatar Alt-tekst"
        value={avatarAlt}
        onChange={(e) => setAvatarAlt(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Banner URL"
        value={bannerUrl}
        onChange={(e) => setBannerUrl(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Banner Alt-tekst"
        value={bannerAlt}
        onChange={(e) => setBannerAlt(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <textarea
        placeholder="Bio (maks 160 tegn)"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        maxLength={160}
        className="w-full p-2 border rounded"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Avbryt
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          Oppdater
        </button>
      </div>
    </form>
  );
}
