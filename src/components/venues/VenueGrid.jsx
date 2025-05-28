import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { doFetch } from "../../api/doFetch";
import { API_HOLIDAZE } from "../../api/constant";
import VenueCard from "./VenueCard";
import Pagination from "../common/Pagination";
import SearchBar from "../common/SearchBar";

const ITEMS_PER_PAGE = 16;

/**
 * Builds a URL query string from a params object.
 * Filters out empty, null, or undefined values.
 *
 * @param {Object} params - The query parameters.
 * @returns {string} Query string starting with '?' or empty string.
 */
function buildQueryString(params) {
  const query = Object.entries(params)
    .filter(([, value]) => {
      if (typeof value === "boolean") return value === true;
      return value !== "" && value !== null && value !== undefined;
    })
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&");
  return query ? `?${query}` : "";
}

/**
 * VenueGrid component displaying a searchable, sortable, and paginated grid of venues.
 *
 * Uses either default venue data or search results based on filters.
 *
 * @component
 */
const VenueGrid = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSort = searchParams.get("sort") || "created";
  const initialOrder = searchParams.get("sortOrder") || "desc";

  const [sortOption, setSortOption] = useState({
    sort: initialSort,
    sortOrder: initialOrder,
  });

  const [searchFilters, setSearchFilters] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [searchPage, setSearchPage] = useState(1);
  const [totalSearchPages, setTotalSearchPages] = useState(1);

  const {
    data: defaultData,
    loading,
    error,
    page,
    nextPage,
    prevPage,
    totalPages,
  } = useFetch(
    `${API_HOLIDAZE.VENUES}?sort=${sortOption.sort}&sortOrder=${sortOption.sortOrder}`,
    {
      paginate: true,
      itemsPerPage: ITEMS_PER_PAGE,
    },
  );

  useEffect(() => {
    const fetchSearch = async () => {
      if (!searchFilters || Object.keys(searchFilters).length === 0) {
        setSearchResults([]);
        setSearchPage(1);
        return;
      }

      setSearchLoading(true);
      setSearchError(null);

      try {
        const params = {
          ...searchFilters,
          limit: ITEMS_PER_PAGE,
          page: searchPage,
          sort: sortOption.sort,
          sortOrder: sortOption.sortOrder,
        };
        const queryString = buildQueryString(params);
        const url = `${API_HOLIDAZE.VENUES}/search${queryString}`;

        const response = await doFetch(url);
        setSearchResults(response.data);
        const totalItems = response.meta?.totalCount || response.data.length;
        setTotalSearchPages(Math.ceil(totalItems / ITEMS_PER_PAGE));
      } catch (err) {
        setSearchError(err);
      } finally {
        setSearchLoading(false);
      }
    };

    fetchSearch();
  }, [searchFilters, searchPage, sortOption]);

  const venues = searchFilters ? searchResults : defaultData;
  const isLoading = searchFilters ? searchLoading : loading;
  const isError = searchFilters ? searchError : error;
  const currentPage = searchFilters ? searchPage : page;
  const totalPagesToShow = searchFilters ? totalSearchPages : totalPages;

  /**
   * Handler for search submission; resets to page 1.
   *
   * @param {Object} filters - Search filters.
   */
  const handleSearch = (filters) => {
    setSearchFilters(filters);
    setSearchPage(1);
  };

  /**
   * Handles pagination page change.
   *
   * @param {number} newPage - The new page number.
   */
  const handlePageChange = (newPage) => {
    if (searchFilters) {
      setSearchPage(newPage);
    } else {
      if (newPage > page) nextPage();
      else if (newPage < page) prevPage();
    }
  };

  /**
   * Handles changes in sorting dropdown.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} e - The change event.
   */
  const handleSortChange = (e) => {
    const value = e.target.value;
    let newSort, newOrder;

    switch (value) {
      case "newest":
        newSort = "created";
        newOrder = "desc";
        break;
      case "oldest":
        newSort = "created";
        newOrder = "asc";
        break;
      case "name":
        newSort = "name";
        newOrder = "asc";
        break;
      default:
        newSort = "created";
        newOrder = "desc";
    }

    setSortOption({ sort: newSort, sortOrder: newOrder });

    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);
      updated.set("sort", newSort);
      updated.set("sortOrder", newOrder);
      return updated;
    });
  };

  const selectedSortValue =
    sortOption.sort === "created" && sortOption.sortOrder === "desc"
      ? "newest"
      : sortOption.sort === "created" && sortOption.sortOrder === "asc"
        ? "oldest"
        : "name";

  return (
    <div className="p-6">
      <SearchBar onSearch={handleSearch} />

      <div className="mx-auto mb-4">
        <label className="block text-sm font-medium text-gray-700  mb-1">
          Sort order:
        </label>
        <select
          onChange={handleSortChange}
          value={selectedSortValue}
          className="w-full sm:w-64 p-2 rounded-md border  bg-white  text-gray-900  shadow"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Old-New</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>

      {isLoading && <p className="text-center">Loading Venues...</p>}
      {isError && (
        <p className="text-center text-red-500">
          Something went wrong, try a new search or refresh the page..{" "}
          {isError.message}
        </p>
      )}

      {!isLoading && !isError && (
        <>
          {venues.length === 0 ? (
            <p className="text-center">No search results</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {venues.map((venue) => (
                  <VenueCard key={venue.id} venue={venue} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPagesToShow}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default VenueGrid;
