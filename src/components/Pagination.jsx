import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";

const range = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const DOTS = "...";

function getPaginationRange(current, total, siblingCount = 1) {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (total <= totalPageNumbers) {
    return range(1, total);
  }

  const leftSiblingIndex = Math.max(current - siblingCount, 1);
  const rightSiblingIndex = Math.min(current + siblingCount, total);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < total - 1;

  const firstPageIndex = 1;
  const lastPageIndex = total;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftRange = range(1, 3 + 2 * siblingCount);
    return [...leftRange, DOTS, total];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightRange = range(total - (2 * siblingCount + 2), total);
    return [firstPageIndex, DOTS, ...rightRange];
  }

  const middleRange = range(leftSiblingIndex, rightSiblingIndex);
  return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
}

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
      >
        <ChevronsLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={baseBtn}
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
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={baseBtn}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={baseBtn}
      >
        <ChevronsRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
