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

  if (loading) return <p>Laster venues...</p>;
  if (error) return <p>Kunne ikke hente venues: {error.errors?.[0]?.message || error.message}</p>;
  if (venues.length === 0) return <p>Du har ingen venues enda.</p>;

  const pageCount = Math.ceil(venues.length / itemsPerPage);
  const paginatedVenues = venues.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Dine venues</h2>
      <button
        onClick={() => setShowCreateModal(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
      >
        Opprett Ny Venue
      </button>

      <ul className="space-y-4">
        {paginatedVenues.map((venue) => (
          <VenueDashCard
            key={venue.id}
            venue={venue}
            onDelete={triggerRefresh}
            onUpdate={triggerRefresh}
          />
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={pageCount}
        onPageChange={setCurrentPage}
      />

      {showCreateModal && (
        <Modal show={showCreateModal} onClose={() => setShowCreateModal(false)}>
          <CreateVenue
            onClose={() => setShowCreateModal(false)}
            onCreate={triggerRefresh}
          />
        </Modal>
      )}
    </div>
  );
}
