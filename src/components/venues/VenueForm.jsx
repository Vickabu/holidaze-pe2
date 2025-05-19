import React from "react";

const VenueForm = ({
  name,
  setName,
  description,
  setDescription,
  price,
  setPrice,
  maxGuests,
  setMaxGuests,
  location,
  setLocation,
  media,
  handleMediaChange,
  addMediaField,
  loading,
  error,
  onClose,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Navn */}
      <div>
        <label className="block text-sm font-medium">Navn</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Beskrivelse */}
      <div>
        <label className="block text-sm font-medium">Beskrivelse</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Pris */}
      <div>
        <label className="block text-sm font-medium">Pris</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Antall gjester */}
      <div>
        <label className="block text-sm font-medium">Antall Gjester</label>
        <input
          type="number"
          value={maxGuests}
          onChange={(e) => setMaxGuests(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Adresse, By, Land */}
      <div>
        <label className="block text-sm font-medium">Adresse</label>
        <input
          type="text"
          value={location.address}
          onChange={(e) =>
            setLocation({ ...location, address: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">By</label>
        <input
          type="text"
          value={location.city}
          onChange={(e) => setLocation({ ...location, city: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Land</label>
        <input
          type="text"
          value={location.country}
          onChange={(e) =>
            setLocation({ ...location, country: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Media */}
      <div>
        <label className="block text-sm font-medium">Bilder (URL-er)</label>
        {media.map((image, index) => (
          <div key={index} className="mb-2">
            <input
              type="url"
              value={image}
              onChange={(e) => handleMediaChange(index, e.target.value)}
              placeholder={`Bilde-URL ${index + 1}`}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addMediaField}
          className="text-sm text-blue-500 hover:underline"
        >
          Legg til flere bilder
        </button>
      </div>

      {/* Forhåndsvisning av bilder */}
      {media.some((url) => url.trim() !== "") && (
        <div className="mt-4">
          <h3 className="font-semibold">Bilder Forhåndsvisning:</h3>
          <div className="flex space-x-2">
            {media
              .filter((url) => url.trim() !== "")
              .map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-md"
                />
              ))}
          </div>
        </div>
      )}

      {/* Knapper */}
      <div className="flex justify-end gap-4 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Lukk
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Laster..." : "Opprett Venue"}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2">
          Feil ved oppretting: {error.message || String(error)}
        </p>
      )}
    </form>
  );
};

export default VenueForm;
