import { useState } from "react";
import { doFetch } from "../api/doFetch";

export function usePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const post = async (url, body = {}, headers = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await doFetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { post, loading, error };
}
