import React from "react";
import useFetch from "../api/useFetch";
import VenueCard from "./VenueCard";
import { API_HOLIDAZE } from "../api/constant";

const VenueGrid = () => {
  const {
    data,
    loading,
    error,
    page,
    nextPage,
    prevPage,
    totalPages,
  } = useFetch(API_HOLIDAZE.VENUES, {
    paginate: true,
    itemsPerPage: 24, // frontend paginering
  });

  if (loading) return <p className="text-center">Loading venues...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VenueGrid;
