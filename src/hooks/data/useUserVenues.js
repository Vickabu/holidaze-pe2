import useFetch from "../useFetch";
import { API_HOLIDAZE } from "../../api/constant";

export function useUserVenues(refreshKey = 0) {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const accessToken = localStorage.getItem("accessToken");

  const url = `${API_HOLIDAZE.PROFILES}/${user.name}/venues`;

  const {
    data: venues = [],
    loading,
    error,
  } = useFetch(url, {
    options: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    dependencies: [refreshKey],
  });

  return { venues, loading, error };
}
