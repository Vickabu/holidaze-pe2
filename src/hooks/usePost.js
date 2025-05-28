import { useState } from "react";
import { doFetch } from "../api/doFetch";

/**
 * Custom React hook to perform POST requests.
 *
 * @returns {{
 *   post: (url: string, body?: Object<string, any>, headers?: Object<string, string>) => Promise<any>,
 *   loading: boolean,
 *   error: Error | null
 * }}
 */

export function usePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Sends a POST request to the given URL with optional body and headers.
   *
   * @param {string} url - The endpoint URL to send the request to.
   * @param {Object<string, any>} [body={}] - The request body to send, will be JSON-stringified.
   * @param {Object<string, string>} [headers={}] - Additional headers to include in the request.
   * @returns {Promise<any>} The response from the server.
   * @throws Will throw an error if the request fails.
   */

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
