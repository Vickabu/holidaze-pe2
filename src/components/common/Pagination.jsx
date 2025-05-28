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
 * Generates an array representing the pagination range, including numbers and ellipsis.
 *
 * @param {number} current - Current page number.
 * @param {number} total - Total number of pages.
 * @param {number} siblingCount - How many pages to show on each side of current.
 * @returns {(number|string)[]} Array of page numbers and dots (`"..."`).
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
    const leftRange = Array.from({ length: 3 + 2 * siblingCount }, (_, i) => i + 1);
    return [...leftRange, DOTS, total];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightRange = Array.from(
      { length: 3 + 2 * siblingCount },
      (_, i) => total - (3 + 2 * siblingCount) + 1 + i
    );
    return [1, DOTS, ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i
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
    "flex items-center justify-center w-9 h-9 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 hover:bg-blue-100 dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed";

  const activeBtn =
    "bg-blue-500 dark:bg-blue-600 text-white font-bold hover:bg-blue-600";

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
            className="w-9 h-9 flex items-center justify-center text-gray-400 dark:text-gray-500"
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
        )
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
