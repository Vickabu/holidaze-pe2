import { useState } from "react";
import { doFetch } from "../api/doFetch";

export function useDelete() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const remove = async (url, headers = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await doFetch(url, {
        method: "DELETE",
        headers,
      });
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error };
}
