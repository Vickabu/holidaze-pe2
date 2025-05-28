import useFetch from "../useFetch";
import { API_HOLIDAZE } from "../../api/constant";

/**
 * @typedef {Object} UserVenuesResult
 * @property {Array<Object>} venues - List of venues owned by the user.
 * @property {boolean} loading - Whether the venues are currently being fetched.
 * @property {Object|null} error - Error object if fetching failed, otherwise null.
 */

/**
 * Custom hook to fetch venues owned by the current user.
 *
 * @param {number} [refreshKey=0] - Dependency key to trigger re-fetching when updated.
 * @param {Object} [options={}] - Optional settings.
 * @param {boolean} [options.includeOwnerAndBookings=false] - Whether to include `_owner` and `_bookings` in the query.
 * @returns {UserVenuesResult} An object containing the user's venues and fetch status.
 */
export function useUserVenues(
  refreshKey = 0,
  { includeOwnerAndBookings = false } = {},
) {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const accessToken = localStorage.getItem("accessToken");

  const query = includeOwnerAndBookings
    ? { _owner: true, _bookings: true }
    : {};

  const url = `${API_HOLIDAZE.PROFILES}/${user.name}/venues`;

  const {
    data: venues = [],
    loading,
    error,
  } = useFetch(url, {
    query,
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    dependencies: [refreshKey],
  });

  return { venues, loading, error };
}
