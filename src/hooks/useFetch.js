import { useState, useEffect, useRef } from "react";
import { doFetch } from "../api/doFetch";

/**
 * Builds a query string from given parameters.
 * Filters out empty strings, null, undefined, or false boolean values.
 *
 * @param {Object.<string, any>} params - Key-value pairs to convert into a query string.
 * @returns {string} Query string starting with '?' or empty string if no valid params.
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
 * Custom React hook to fetch data from an API endpoint.
 * Supports optional local pagination of results.
 *
 * @param {string} baseUrl - The base API endpoint URL.
 * @param {Object} [config] - Optional configuration object.
 * @param {Object.<string, any>} [config.query={}] - Query parameters to append to the URL.
 * @param {Object} [config.fetchOptions={}] - Additional fetch options like headers, method, body etc.
 * @param {boolean} [config.paginate=false] - Whether to paginate the fetched results locally.
 * @param {number} [config.itemsPerPage=10] - Number of items per page if paginating.
 * @param {Array<any>} [config.dependencies=[]] - Additional dependencies to trigger refetching.
 * @returns {{
 *   data: Array<any>,          // The current page of data or all data if no pagination.
 *   loading: boolean,          // True if fetching data.
 *   error: any,                // Error object if request failed.
 *   page: number,              // Current page number (1-based).
 *   setPage: function,         // Setter function to change the current page.
 *   nextPage: function,        // Function to go to the next page (max is totalPages).
 *   prevPage: function,        // Function to go to the previous page (min is 1).
 *   totalPages: number         // Total number of pages available (1 if no pagination).
 * }}
 */
const useFetch = (
  baseUrl,
  {
    query = {},
    fetchOptions = {},
    paginate = false,
    itemsPerPage = 10,
    dependencies = [],
  } = {},
) => {
  const [rawData, setRawData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const fetchedOnce = useRef(false);

  const totalPages = paginate ? Math.ceil(rawData.length / itemsPerPage) : 1;

  const queryKey = JSON.stringify(query);
  const fetchOptionsKey = JSON.stringify(fetchOptions);

  useEffect(() => {
    const fetchData = async () => {
      if (fetchedOnce.current) return;

      setLoading(true);
      setError(null);

      try {
        const parsedQuery = JSON.parse(queryKey);
        const queryString = buildQueryString(parsedQuery);
        const url = `${baseUrl}${queryString}`;

        const response = await doFetch(url, fetchOptions);
        const fullData = response.data || response;

        if (paginate) {
          setRawData(fullData);
        } else {
          setData(fullData);
        }

        fetchedOnce.current = true;
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchedOnce.current = false;
    fetchData();
  }, [baseUrl, queryKey, fetchOptionsKey, paginate, ...dependencies]);

  useEffect(() => {
    if (paginate) {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      setData(rawData.slice(start, end));
    }
  }, [page, rawData, itemsPerPage, paginate]);

  return {
    data,
    loading,
    error,
    page,
    setPage,
    nextPage: () => setPage((p) => Math.min(p + 1, totalPages)),
    prevPage: () => setPage((p) => Math.max(p - 1, 1)),
    totalPages,
  };
};

export default useFetch;
