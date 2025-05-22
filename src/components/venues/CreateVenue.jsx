import { useState } from "react";
import { API_HOLIDAZE } from "../../api/constant";
import { usePost } from "../../hooks/usePost";
import VenueForm from "./VenueForm";
import { validateVenue } from "../../utils/validation";


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
  const [errors, setErrors] = useState({});


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
  setErrors({}); // nullstill tidligere feil

  const transformedMedia = media
    .filter((url) => url.trim() !== "")
    .map((url) => ({
      url: url.trim(),
      alt: "", // evt. legg til felt i skjema senere
    }));

  const parsedVenue = {
    name: name.trim(),
    description: description.trim(),
    media: transformedMedia,
    price: parseFloat(price),
    maxGuests: parseInt(maxGuests, 10),
    location: {
      ...location,
    },
  };

  const validationErrors = validateVenue(parsedVenue);
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    await post(API_HOLIDAZE.VENUES, parsedVenue);
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
          errors={errors}
          onClose={onClose}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateVenue;
