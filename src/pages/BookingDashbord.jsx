import { useState } from "react";
import useFetch from "../api/useFetch";
import { API_HOLIDAZE } from "../api/constant";
import { doFetch } from "../api/doFetch";

export default function BookingDashboard() {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const accessToken = localStorage.getItem("accessToken");

  const [refreshKey, setRefreshKey] = useState(0); 

  const url = `${API_HOLIDAZE.PROFILES}/${user.name}/bookings?_venue=true`;

  const { data: bookings, loading, error } = useFetch(url, {
    options: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    dependencies: [refreshKey], 
  });



  const cancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm("Er du sikker på at du vil avbestille?");
    if (!confirmCancel) return;

    try {
      await doFetch(`${API_HOLIDAZE.BOOKINGS}/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      alert("Booking avbestilt!");
      setRefreshKey((prev) => prev + 1); 
    } catch (err) {
      alert("Kunne ikke avbestille: " + (err.errors?.[0]?.message || err.message));
    }
  };

  if (loading) return <p>Laster bookinger...</p>;
  if (error) return <p>Kunne ikke hente bookinger: {error.errors?.[0]?.message || error.message}</p>;

  const now = new Date();

  const upcoming = bookings.filter((b) => new Date(b.dateFrom) > now);
  const past = bookings.filter((b) => new Date(b.dateFrom) <= now);

  const renderBookings = (list, isUpcoming = true) =>
    list.length === 0 ? (
      <p>{isUpcoming ? "Ingen kommende bookinger." : "Ingen tidligere bookinger."}</p>
    ) : (
      <ul className="space-y-6">
        {list.map((booking) => {
          const venue = booking.venue;
          const image = venue?.media?.[0]?.url || "https://cdn.pixabay.com/photo/2022/09/06/14/40/beach-7436794_1280.jpg";
  
          return (
            <li key={booking.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
              <img src={image} alt={venue?.name} className="w-full md:w-64 h-48 object-cover" />
              <div className="p-4 flex-1">
                <h3 className="text-lg font-bold">{venue?.name || "Ukjent sted"}</h3>
                {venue?.location?.city && (
                  <p className="text-gray-600">{venue.location.city}, {venue.location.country}</p>
                )}
                <p className="mt-2">
                  <strong>Fra:</strong> {new Date(booking.dateFrom).toLocaleDateString()}<br />
                  <strong>Til:</strong> {new Date(booking.dateTo).toLocaleDateString()}
                </p>
                <p className="mt-1">Gjester: {booking.guests}</p>
                {isUpcoming && (
                  <button
                    onClick={() => cancelBooking(booking.id)}
                    className="mt-4 inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Avbestill
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    );
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Mine Bestillinger</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Kommende</h2>
        {renderBookings(upcoming, true)}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Tidligere</h2>
        {renderBookings(past, false)}
      </section>
    </div>
  );
}
