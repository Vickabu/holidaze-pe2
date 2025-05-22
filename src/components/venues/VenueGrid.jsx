import React from "react";
import useFetch from "../../hooks/useFetch";
import VenueCard from "./VenueCard";
import { API_HOLIDAZE } from "../../api/constant";
import Pagination from "../common/Pagination";

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
    itemsPerPage: 16, 
  });

  if (loading) return <p className="text-center">Laster steder...</p>;
  if (error) return <p className="text-center text-red-500">Feil: {error.message}</p>;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => {
          if (newPage > page) nextPage();
          else if (newPage < page) prevPage();
        }}
      />
    </div>
  );
};

export default VenueGrid;
