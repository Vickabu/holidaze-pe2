import useFetch from "../useFetch";
import { API_HOLIDAZE } from "../../api/constant";

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
