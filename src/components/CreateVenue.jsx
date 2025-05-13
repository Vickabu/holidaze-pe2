import { useState } from "react";
import { doFetch } from "../api/doFetch";
import { API_HOLIDAZE } from "../api/constant";

const CreateVenue = ({ onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [location, setLocation] = useState({
    address: "",
    city: "",
    country: "",
  });
  const [media, setMedia] = useState([""]); 
  const [loading, setLoading] = useState(false);

  const handleMediaChange = (index, value) => {
    const newMedia = [...media];
    newMedia[index] = value;
    setMedia(newMedia);
  };

  const addMediaField = () => {
    setMedia([...media, ""]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);


    const filteredMedia = media.filter((url) => url.trim() !== "");

    const venueData = {
      name,
      description,
      price: parseFloat(price),
      maxGuests: parseInt(maxGuests, 10),
      location,
      media: filteredMedia.map((url) => ({ url })),
    };

    if (isNaN(venueData.price) || isNaN(venueData.maxGuests)) {
      alert("Pris og antall gjester må være gyldige tall!");
      setLoading(false);
      return;
    }

    try {
      await doFetch(API_HOLIDAZE.VENUES, {
        method: "POST",
        body: JSON.stringify(venueData),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      onCreate();
      onClose();
    } catch (error) {
      alert("Kunne ikke opprette venue: " + (error.message || error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500/50 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full overflow-auto" style={{ maxHeight: "90vh" }}>
        <h2 className="text-xl font-semibold mb-4">Legg til Venue</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <div>
            <label className="block text-sm font-medium">Beskrivelse</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
              onChange={(e) =>
                setLocation({ ...location, city: e.target.value })
              }
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
        </form>
      </div>
    </div>
  );
};

export default CreateVenue;
