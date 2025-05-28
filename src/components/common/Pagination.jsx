import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";

const DOTS = "...";

/**
 * Pagination component for navigating between pages.
 *
 * @component
 *
 * @param {Object} props - Component properties.
 * @param {number} props.currentPage - The currently selected page number.
 * @param {number} props.totalPages - The total number of pages available.
 * @param {(page: number) => void} props.onPageChange - Callback invoked when the user selects a new page.
 *
 * @returns {React.ReactNode|null} Pagination UI or null if only one page exists.
 */
function getPaginationRange(current, total, siblingCount = 1) {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (total <= totalPageNumbers) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(current - siblingCount, 1);
  const rightSiblingIndex = Math.min(current + siblingCount, total);
  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < total - 1;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftRange = Array.from(
      { length: 3 + 2 * siblingCount },
      (_, i) => i + 1,
    );
    return [...leftRange, DOTS, total];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightRange = Array.from(
      { length: 3 + 2 * siblingCount },
      (_, i) => total - (3 + 2 * siblingCount) + 1 + i,
    );
    return [1, DOTS, ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i,
  );
  return [1, DOTS, ...middleRange, DOTS, total];
}

/**
 * Pagination component to navigate through pages.
 *
 * @component
 * @param {Object} props
 * @param {number} props.currentPage - Currently selected page.
 * @param {number} props.totalPages - Total number of available pages.
 * @param {function} props.onPageChange - Callback triggered when the page changes.
 */

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const paginationRange = getPaginationRange(currentPage, totalPages);

  if (totalPages <= 1) return null;

  const baseBtn =
    "flex items-center justify-center w-9 h-9 rounded-md border border-gray-400 text-gray-700 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed";

  const activeBtn = "text-gray-800 font-bold hover:bg-gray-600";

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={baseBtn}
        aria-label="First page"
      >
        <ChevronsLeft className="w-4 h-4" />
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={baseBtn}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {paginationRange.map((page, idx) =>
        page === DOTS ? (
          <span
            key={idx}
            className="w-9 h-9 flex items-center justify-center text-gray-400"
          >
            <MoreHorizontal className="w-4 h-4" />
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => onPageChange(page)}
            className={`${baseBtn} ${page === currentPage ? activeBtn : ""}`}
            aria-label={`Page ${page}`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={baseBtn}
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={baseBtn}
        aria-label="Last page"
      >
        <ChevronsRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
