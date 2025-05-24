import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { doFetch } from "../../api/doFetch";
import { API_HOLIDAZE } from "../../api/constant";
import VenueCard from "./VenueCard";
import Pagination from "../common/Pagination";
import SearchBar from "../common/SearchBar";

const ITEMS_PER_PAGE = 16;

function buildQueryString(params) {
  // Fjern falsy eller tomme parametre
  const query = Object.entries(params)
    .filter(([value]) => {
      if (typeof value === "boolean") return value === true;
      return value !== "" && value !== null && value !== undefined;
    })
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
  return query ? `?${query}` : "";
}

const VenueGrid = () => {
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
  } = useFetch(API_HOLIDAZE.VENUES, {
    paginate: true,
    itemsPerPage: ITEMS_PER_PAGE,
  });

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
        // Legg til side og limit i parametre
        const params = { ...searchFilters, limit: ITEMS_PER_PAGE, page: searchPage };
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
  }, [searchFilters, searchPage]);

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

  return (
    <div className="p-6">
      <SearchBar onSearch={handleSearch} />

      {isLoading && <p className="text-center">Laster steder...</p>}
      {isError && <p className="text-center text-red-500">Feil: {isError.message}</p>}

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
