import { useState } from "react";
import { API_HOLIDAZE } from "../../api/constant";
import { usePost } from "../../hooks/usePost";
import { validateVenue } from "../../utils/validation";
import VenueForm from "./VenueForm";

export default function CreateVenue({ onClose, onCreate }) {
  const { post, loading } = usePost();
  const [formError, setFormError] = useState(null);

  const handleCreate = async (venueData) => {
    const validationErrors = validateVenue(venueData);
    if (Object.keys(validationErrors).length > 0) {
      setFormError("Vennligst fyll ut alle nødvendige felter riktig.");
      return;
    }

    try {
      await post(API_HOLIDAZE.VENUES, venueData);
      onCreate?.();
      onClose?.();
    } catch (e) {
      setFormError("Kunne ikke opprette venue: " + (e.message || e));
    }
  };

  return (
    <div className="p-2 max-w-lg w-full">
      <h2 className="text-xl font-semibold mb-4">Legg til Venue</h2>
      <VenueForm
        initialValues={{}}
        onSubmit={handleCreate}
        onClose={onClose}
        loading={loading}
        error={formError && { message: formError }}
        submitText="Opprett Venue"
      />
    </div>
  );
}
