import { useState, useEffect, useRef } from "react";
import { doFetch } from "./doFetch";

const useFetch = (
  url,
  { options = {}, paginate = false, itemsPerPage = 10 } = {},
) => {
  const [rawData, setRawData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const fetchedOnce = useRef(false);

  const totalPages = paginate ? Math.ceil(rawData.length / itemsPerPage) : 1;

  useEffect(() => {
    const fetchData = async () => {
      if (fetchedOnce.current) return;

      setLoading(true);
      setError(null);
      try {
        const response = await doFetch(url, options);
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

    fetchData();
  }, [url, options, paginate]);

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
