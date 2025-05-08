import useFetch from "../api/useFetch";
import { API_HOLIDAZE } from "../api/constant";

export default function VenueDashboard() {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const accessToken = localStorage.getItem("accessToken");

  const url = `${API_HOLIDAZE.PROFILES}/${user.name}/venues`;

  const { data: venues, loading, error } = useFetch(url, {
    options: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });

  if (loading) return <p>Laster venues...</p>;
  if (error) return <p>Kunne ikke hente venues: {error.errors?.[0]?.message || error.message}</p>;

  return (
    <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Dine venues</h2>
      {venues.length === 0 ? (
        <p>Du har ingen venues enda.</p>
      ) : (
        <ul className="space-y-4">
          {venues.map((venue) => (
            <li key={venue.id} className="bg-white dark:bg-gray-700 p-4 rounded shadow">
              <h3 className="text-lg font-bold">{venue.name}</h3>
              <p>{venue.location?.city}, {venue.location?.country}</p>
              <p>Pris: {venue.price} NOK</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
