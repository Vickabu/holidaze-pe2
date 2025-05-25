import { useState } from "react";
import { API_HOLIDAZE } from "../../api/constant";
import { usePut } from "../../hooks/usePut";
import { validateVenue } from "../../utils/validation";
import VenueForm from "./VenueForm";

export default function EditVenue({ venue, onClose, onSuccess }) {
  const { put, loading } = usePut();
  const [formError, setFormError] = useState(null);

  const handleUpdate = async (updatedVenue) => {
    const validationErrors = validateVenue(updatedVenue);
    if (Object.keys(validationErrors).length > 0) {
      setFormError("Vennligst fyll ut alle nødvendige felter riktig.");
      return;
    }

    try {
      await put(`${API_HOLIDAZE.VENUES}/${venue.id}`, updatedVenue);
      onSuccess?.();
      onClose?.();
    } catch (err) {
      setFormError("Feil ved oppdatering: " + (err.message || err));
    }
  };

  return (
    <div className="p-2 max-w-lg w-full">
      <h2 className="text-xl font-semibold mb-4">Rediger Venue</h2>
      <VenueForm
        initialValues={venue}
        onSubmit={handleUpdate}
        onClose={onClose}
        loading={loading}
        error={formError && { message: formError }}
        submitText="Oppdater Venue"
      />
    </div>
  );
}
