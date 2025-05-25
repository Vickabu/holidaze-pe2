import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { doFetch } from "../../api/doFetch";
import { API_HOLIDAZE } from "../../api/constant";
import VenueCard from "./VenueCard";
import Pagination from "../common/Pagination";
import SearchBar from "../common/SearchBar";

const ITEMS_PER_PAGE = 16;

function buildQueryString(params) {
  const query = Object.entries(params)
    .filter(([value]) => {
      if (typeof value === "boolean") return value === true;
      return value !== "" && value !== null && value !== undefined;
    })
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
  return query ? `?${query}` : "";
}

const VenueGrid = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // ⏳ Hent initial sortering fra URL (ellers fallback)
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

  // 🧲 Default data med sortering i URL
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
    }
  );

  // 🔎 Hent søk hvis aktivt
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
        const totalItems =
          response.meta?.totalCount || response.data.length;
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

  const handleSearch = (filters) => {
    setSearchFilters(filters);
    setSearchPage(1);
  };

  const handlePageChange = (newPage) => {
    if (searchFilters) {
      setSearchPage(newPage);
    } else {
      if (newPage > page) nextPage();
      else if (newPage < page) prevPage();
    }
  };

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

    // 💡 Oppdater URL
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

      {/* Sortering */}
      <div className="max-w-4xl mx-auto mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Sorter etter:
        </label>
        <select
          onChange={handleSortChange}
          value={selectedSortValue}
          className="w-full sm:w-64 p-2 rounded-md border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow"
        >
          <option value="newest">Nyeste først</option>
          <option value="oldest">Eldste først</option>
          <option value="name">Navn A–Å</option>
        </select>
      </div>

      {/* Laster / feil */}
      {isLoading && <p className="text-center">Laster steder...</p>}
      {isError && (
        <p className="text-center text-red-500">
          Feil: {isError.message}
        </p>
      )}

      {/* Resultat */}
      {!isLoading && !isError && (
        <>
          {venues.length === 0 ? (
            <p className="text-center">Ingen treff.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
