import { useState } from "react";
import { doFetch } from "../api/doFetch";

/**
 * Custom hook for handling DELETE requests.
 * Manages loading and error state during the request.
 *
 * @returns {{
 *   remove: (url: string, headers?: { [key: string]: string }) => Promise<any>,
 *   loading: boolean,
 *   error: any
 * }}
 */

export function useDelete() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Perform a DELETE request to the given URL with optional headers.
   *
   * @param {string} url - The endpoint to send the DELETE request to.
   * @param {{ [key: string]: string }} [headers={}] - Optional headers for the request.
   * @returns {Promise<any>} - The response from the server.
   */
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
