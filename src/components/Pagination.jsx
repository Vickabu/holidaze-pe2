import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;