import useFetch from "../useFetch";
import { API_HOLIDAZE } from "../../api/constant";

/**
 * Custom hook to fetch and separate user bookings into upcoming and past.
 *
 * @param {number} refreshKey - A dependency key to trigger refetching of bookings.
 * @returns {{
 *   upcoming: Array,
 *   past: Array,
 *   loading: boolean,
 *   error: object|null
 * }}
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

  // Separate bookings into upcoming and past based on current date
  const upcoming = bookings.filter((b) => new Date(b.dateFrom) > now);
  const past = bookings.filter((b) => new Date(b.dateFrom) <= now);

  return { upcoming, past, loading, error };
}
