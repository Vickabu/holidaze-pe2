import { useState } from "react";
import { API_HOLIDAZE } from "../../api/constant";
import { usePost } from "../../hooks/usePost";
import VenueForm from "./VenueForm";

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

  const { post, loading, error } = usePost();

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
      return;
    }

    try {
      await post(API_HOLIDAZE.VENUES, venueData);
      onCreate();
      onClose();
    } catch (e) {
      alert("Kunne ikke opprette venue: " + (e.message || e));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500/50 bg-opacity-50 z-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full overflow-auto"
        style={{ maxHeight: "90vh" }}
      >
        <h2 className="text-xl font-semibold mb-4">Legg til Venue</h2>
        <VenueForm
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          price={price}
          setPrice={setPrice}
          maxGuests={maxGuests}
          setMaxGuests={setMaxGuests}
          location={location}
          setLocation={setLocation}
          media={media}
          handleMediaChange={handleMediaChange}
          addMediaField={addMediaField}
          loading={loading}
          error={error}
          onClose={onClose}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateVenue;
