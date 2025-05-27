import { useState, useEffect, useRef } from "react";
import { doFetch } from "../api/doFetch";

/**
 * Builds a query string from given parameters.
 * Filters out empty, null, undefined or false boolean values.
 *
 * @param {Object} params - Key-value pairs to convert into query string.
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
 * Custom React hook to fetch data from an API endpoint.
 * Supports optional pagination.
 *
 * @param {string} baseUrl - The base API endpoint URL.
 * @param {Object} [config] - Optional configuration object.
 * @param {Object} [config.options={}] - Options (query params) for the request.
 * @param {boolean} [config.paginate=false] - Whether to paginate results locally.
 * @param {number} [config.itemsPerPage=10] - Number of items per page if paginating.
 * @returns {Object} An object containing data, loading state, error, pagination controls.
 */
const useFetch = (
  baseUrl,
  { options = {}, paginate = false, itemsPerPage = 10 } = {},
) => {
  const [rawData, setRawData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const fetchedOnce = useRef(false);

  const totalPages = paginate ? Math.ceil(rawData.length / itemsPerPage) : 1;
  const optionsKey = JSON.stringify(options);

  useEffect(() => {
    const fetchData = async () => {
      if (fetchedOnce.current) return;

      setLoading(true);
      setError(null);

      try {
        const parsedOptions = JSON.parse(optionsKey);
        const queryString = buildQueryString(parsedOptions);
        const url = `${baseUrl}${queryString}`;

        const response = await doFetch(url);
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
  }, [baseUrl, optionsKey, paginate]);

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
