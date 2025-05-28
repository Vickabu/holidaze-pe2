import { useState } from "react";
import { doFetch } from "../api/doFetch";

/**
 * Custom React hook to perform PUT requests.
 *
 * @returns {{
 *   put: (url: string, body?: Object<string, any>, headers?: Object<string, string>) => Promise<any>,
 *   loading: boolean,
 *   error: Error | null
 * }}
 */
export function usePut() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Sends a PUT request to the given URL with optional body and headers.
   *
   * @param {string} url - The endpoint URL to send the request to.
   * @param {Object<string, any>} [body={}] - The request body to send, will be JSON-stringified.
   * @param {Object<string, string>} [headers={}] - Additional headers to include in the request.
   * @returns {Promise<any>} The response from the server.
   * @throws Will throw an error if the request fails.
   */
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
