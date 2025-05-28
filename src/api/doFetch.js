import { API_KEY } from "./constant";

/**
 * Retrieves authorization headers from local storage if an access token is present.
 *
 * @returns {{ [key: string]: string }} An object containing the Authorization header if a token exists, otherwise an empty object.
 */

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Performs a fetch request with default headers including API key and optional auth token.
 * Automatically parses JSON responses if available, and throws parsed error responses.
 *
 * @param {string} url - The API endpoint to fetch.
 * @param {Object} [options={}] - Optional fetch options (method, body, headers, etc.).
 * @returns {Promise<Object>} The parsed JSON response, or an empty object if the response has no JSON body.
 * @throws {Object} Parsed error response from the API if the response status is not OK (non-2xx).
 */

export const doFetch = async (url, options = {}) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": API_KEY,
      ...getAuthHeaders(),
      ...(options.headers || {}),
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw await response.json();
    }

    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return await response.json();
    }

    return {};
  } catch (error) {
    console.error("doFetch error:", error);
    throw error;
  }
};
