import { useState } from "react";
import { API_HOLIDAZE } from "../../api/constant";
import { usePut } from "../../hooks/usePut";
import { validateVenue } from "../../utils/validation";
import VenueForm from "./VenueForm";
import { PencilLine } from "lucide-react";

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
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <PencilLine className="w-5 h-5 text-blue-500" />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Rediger Venue
        </h2>
      </div>

      {formError && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded mb-4 text-sm">
          {formError}
        </div>
      )}

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
