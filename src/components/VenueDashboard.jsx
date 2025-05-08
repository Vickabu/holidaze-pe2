import { useState } from "react";
import useFetch from "../api/useFetch";
import { API_HOLIDAZE } from "../api/constant";
import VenueDashCard from "./VenueDashCard";

export default function VenueDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const user = JSON.parse(localStorage.getItem("userInfo"));
  const accessToken = localStorage.getItem("accessToken");

  const url = `${API_HOLIDAZE.PROFILES}/${user.name}/venues`;
  const { data: venues, loading, error } = useFetch(url, {
    options: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    dependencies: [refreshKey],
  });

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  if (loading) return <p>Laster venues...</p>;
  if (error) return <p>Kunne ikke hente venues: {error.errors?.[0]?.message || error.message}</p>;
  if (!venues || venues.length === 0) return <p>Du har ingen venues enda.</p>;

  // Frontend-paginering:
  const pageCount = Math.ceil(venues.length / itemsPerPage);
  const paginatedVenues = venues.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Dine venues</h2>
      <ul className="space-y-4">
        {paginatedVenues.map((venue) => (
          <VenueDashCard key={venue.id} venue={venue} onDelete={triggerRefresh} />
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Forrige
        </button>
        <span className="px-3 py-1">{currentPage} / {pageCount}</span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, pageCount))}
          disabled={currentPage === pageCount}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Neste
        </button>
      </div>
    </div>
  );
}
