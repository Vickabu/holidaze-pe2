import useFetch from "../useFetch";
import { API_HOLIDAZE } from "../../api/constant";

/**
 * @typedef {Object} BookingResult
 * @property {Array<Object>} upcoming - Bookings with dates in the future.
 * @property {Array<Object>} past - Bookings with dates in the past or today.
 * @property {boolean} loading - Whether the data is still being fetched.
 * @property {Object|null} error - Error object if fetching failed, otherwise null.
 */

/**
 * Custom hook to fetch and separate user bookings into upcoming and past.
 *
 * @param {number} [refreshKey=0] - A dependency key to trigger refetching of bookings.
 * @returns {BookingResult} The categorized bookings and fetch state.
 */
export function useUserBookings(refreshKey = 0) {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const accessToken = localStorage.getItem("accessToken");
  const url = `${API_HOLIDAZE.PROFILES}/${user.name}/bookings?_venue=true&_customer=true`;

  const {
    data: bookings = [],
    loading,
    error,
  } = useFetch(url, {
    options: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        _venue: true,
      },
    },
    dependencies: [refreshKey],
  });

  const now = new Date();

  const upcoming = bookings.filter((b) => new Date(b.dateFrom) > now);
  const past = bookings.filter((b) => new Date(b.dateFrom) <= now);

  return { upcoming, past, loading, error };
}
