import { useState } from "react";
import { doFetch } from "../api/doFetch";

export function usePut() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const put = async (url, body = {}, headers = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await doFetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(body),
      });
      return response;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { put, loading, error };
}
