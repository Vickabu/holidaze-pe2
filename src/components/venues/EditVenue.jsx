import { useState } from "react";
import { API_HOLIDAZE } from "../../api/constant";
import { usePut } from "../../hooks/usePut";
import { validateVenue } from "../../utils/validation";
import VenueForm from "./VenueForm";
import { PencilLine } from "lucide-react";

/**
 * Component for editing an existing venue.
 *
 * @param {Object} props
 * @param {Object} props.venue - Venue object to be edited.
 * @param {Function} props.onClose - Callback to close the edit form/modal.
 * @param {Function} props.onSuccess - Callback triggered after successful update.
 *
 * @returns {JSX.Element} Edit venue form UI.
 */

export default function EditVenue({ venue, onClose, onSuccess }) {
  const { put, loading } = usePut();
  const [formError, setFormError] = useState(null);

  /**
   * Handles the submission of the updated venue data.
   * Validates data before sending PUT request.
   * Sets error state if validation or update fails.
   *
   * @param {Object} updatedVenue - The updated venue data from the form.
   */
  const handleUpdate = async (updatedVenue) => {
    const validationErrors = validateVenue(updatedVenue);
    if (Object.keys(validationErrors).length > 0) {
      setFormError("Please fill out all required fields correctly.");
      return;
    }

    try {
      await put(`${API_HOLIDAZE.VENUES}/${venue.id}`, updatedVenue);
      onSuccess?.();
      onClose?.();
    } catch (err) {
      setFormError("Update failed: " + (err.message || err));
    }
  };

  return (
    <div className="p-6 w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <PencilLine className="w-5 h-5 text-[#1F3B3C]" />
        <h2 className="text-2xl font-semibold text-gray-800 ">Edit Venue</h2>
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
        submitText="Update Venue"
      />
    </div>
  );
}
