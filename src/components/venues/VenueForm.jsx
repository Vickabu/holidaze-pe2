import React, { useState, useEffect } from "react";
import { validateUrl } from "../../utils/validation";

const VenueForm = ({
  initialValues = {},
  onSubmit,
  onClose,
  loading = false,
  error = null,
  submitText = "Save",
}) => {
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

  const [mediaErrors, setMediaErrors] = useState([]);

  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name || "");
      setDescription(initialValues.description || "");
      setPrice(initialValues.price?.toString() || "");
      setMaxGuests(initialValues.maxGuests?.toString() || "");
      setLocation(initialValues.location || { address: "", city: "", country: "" });
      setMedia(
        initialValues.media?.length > 0
          ? initialValues.media.map((m) => m.url || m)
          : [""]
      );
    }
  }, [initialValues]);

  const handleMediaChange = (index, value) => {
    const newMedia = [...media];
    newMedia[index] = value;
    setMedia(newMedia);

    const newErrors = [...mediaErrors];
    if (value.trim() === "" || validateUrl(value.trim())) {
      newErrors[index] = null;
    } else {
      newErrors[index] = "Invalid URL";
    }
    setMediaErrors(newErrors);
  };

  const addMediaField = () => {
    if (media.length < 8) {
      setMedia([...media, ""]);
      setMediaErrors([...mediaErrors, null]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = media.map((url) =>
      url.trim() === "" ? null : validateUrl(url.trim()) ? null : "Invalid URL"
    );
    setMediaErrors(errors);

    if (errors.some((e) => e !== null)) {
      return;
    }

    const parsedData = {
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      maxGuests: parseInt(maxGuests, 10),
      location,
      media: media
        .filter((url) => url.trim() !== "")
        .map((url) => ({ url: url.trim(), alt: "" })),
    };

    onSubmit(parsedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Max Guests</label>
        <input
          type="number"
          value={maxGuests}
          onChange={(e) => setMaxGuests(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Address</label>
        <input
          type="text"
          value={location.address}
          onChange={(e) => setLocation({ ...location, address: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">City</label>
        <input
          type="text"
          value={location.city}
          onChange={(e) => setLocation({ ...location, city: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Country</label>
        <input
          type="text"
          value={location.country}
          onChange={(e) => setLocation({ ...location, country: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Images (URLs)</label>
        {media.map((image, index) => (
          <div key={index} className="mb-2">
            <input
              type="url"
              value={image}
              onChange={(e) => handleMediaChange(index, e.target.value)}
              placeholder={`Image URL ${index + 1}`}
              className={`w-full p-2 border rounded-md ${
                mediaErrors[index] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {mediaErrors[index] && (
              <p className="text-red-500 text-xs mt-1">{mediaErrors[index]}</p>
            )}
          </div>
        ))}
        {media.length < 8 && (
          <button
            type="button"
            onClick={addMediaField}
            className="text-sm text-blue-500 hover:underline"
          >
            Add more images
          </button>
        )}
      </div>

      {media.some((url) => url.trim() !== "") && (
        <div className="mt-4">
          <h3 className="font-semibold">Image Preview:</h3>
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
          className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md"
        >
          Close
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Loading..." : submitText}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2">
          Error: {error.message || String(error)}
        </p>
      )}
    </form>
  );
};

export default VenueForm;
