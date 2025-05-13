import { useState } from "react";
import useFetch from "../api/useFetch";
import { API_HOLIDAZE } from "../api/constant";
import BookingCard from "./BookingCard";
import Pagination from "./Pagination"; // Husk å importere den!

export default function BookingDashboard() {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const accessToken = localStorage.getItem("accessToken");

  const [refreshKey, setRefreshKey] = useState(0);
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [pastPage, setPastPage] = useState(1);

  const itemsPerPage = 6;

  const url = `${API_HOLIDAZE.PROFILES}/${user.name}/bookings?_venue=true`;

  const { data: bookings, loading, error } = useFetch(url, {
    options: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    dependencies: [refreshKey],
  });

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  if (loading) return <p>Laster bookinger...</p>;
  if (error)
    return (
      <p>
        Kunne ikke hente bookinger:{" "}
        {error.errors?.[0]?.message || error.message}
      </p>
    );

  const now = new Date();
  const upcoming = bookings.filter((b) => new Date(b.dateFrom) > now);
  const past = bookings.filter((b) => new Date(b.dateFrom) <= now);

  const paginateList = (list, page) =>
    list.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const renderBookings = (list, page, onPageChange, isUpcoming = true) => {
    if (list.length === 0) {
      return <p>{isUpcoming ? "Ingen kommende bookinger." : "Ingen tidligere bookinger."}</p>;
    }

    const pageCount = Math.ceil(list.length / itemsPerPage);
    const paginated = paginateList(list, page);

    return (
      <>
        <ul className="space-y-6">
          {paginated.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              isUpcoming={isUpcoming}
              onRefresh={triggerRefresh}
            />
          ))}
        </ul>
        <Pagination
          currentPage={page}
          totalPages={pageCount}
          onPageChange={onPageChange}
        />
      </>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Mine Bestillinger</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Kommende</h2>
        {renderBookings(upcoming, upcomingPage, setUpcomingPage, true)}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Tidligere</h2>
        {renderBookings(past, pastPage, setPastPage, false)}
      </section>
    </div>
  );
}
