import { useState } from "react";
import { usePut } from "../../hooks/usePut";
import { API_HOLIDAZE } from "../../api/constant";

export default function EditVenueForm({ venue, onClose, onSuccess }) {
  const [name, setName] = useState(venue.name || "");
  const [price, setPrice] = useState(venue.price || 0);
  const [maxGuests, setMaxGuests] = useState(venue.maxGuests || 1);
  const [description, setDescription] = useState(venue.description || "");
  const [mediaUrl, setMediaUrl] = useState(venue.media?.[0]?.url || "");

  const { put, loading, error } = usePut();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedVenue = {
      name,
      description,
      price: Number(price),
      maxGuests: Number(maxGuests),
      media: mediaUrl ? [{ url: mediaUrl }] : [],
    };

    try {
      await put(`${API_HOLIDAZE.VENUES}/${venue.id}`, updatedVenue);
      onSuccess?.(); 
      onClose?.();
    } catch (err) {
      console.error("Feil ved oppdatering:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Rediger Venue</h2>

      <input
        type="text"
        placeholder="Navn"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Pris"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Maks gjester"
        value={maxGuests}
        onChange={(e) => setMaxGuests(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Beskrivelse"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Media URL"
        value={mediaUrl}
        onChange={(e) => setMediaUrl(e.target.value)}
        className="w-full p-2 border rounded"
      />

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
          Avbryt
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Lagrer..." : "Oppdater"}
        </button>
      </div>
    </form>
  );
}
