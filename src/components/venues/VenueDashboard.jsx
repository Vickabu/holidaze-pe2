import { useState } from "react";
import { useUserVenues } from "../../hooks/data/useUserVenues";
import VenueDashCard from "./VenueDashCard";
import Pagination from "../common/Pagination";
import CreateVenue from "./CreateVenue";
import Modal from "../common/Modal";

export default function VenueDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const itemsPerPage = 12;

  const { venues = [], loading, error } = useUserVenues(refreshKey);
  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  const pageCount = Math.ceil(venues.length / itemsPerPage);
  const paginatedVenues = venues.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Venues</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
        >
          + Create New Venue
        </button>
      </div>

      {loading ? (
        <p>Loading venues...</p>
      ) : error ? (
        <p className="text-red-600">
          Failed to load venues: {error.errors?.[0]?.message || error.message}
        </p>
      ) : venues.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300 italic">
          You have no venues yet. Click the button above to create your first one!
        </p>
      ) : (
        <>
          <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {paginatedVenues.map((venue) => (
              <VenueDashCard
                key={venue.id}
                venue={venue}
                onDelete={triggerRefresh}
                onUpdate={triggerRefresh}
              />
            ))}
          </ul>

          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={pageCount}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}

      <Modal show={showCreateModal} onClose={() => setShowCreateModal(false)}>
        <CreateVenue
          onClose={() => setShowCreateModal(false)}
          onCreate={triggerRefresh}
        />
      </Modal>
    </div>
  );
}
