import { useState } from "react";
import { useUserBookings } from "../../hooks/data/useUserBookings";
import BookingSection from "./BookingSection";

export default function BookingDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [pastPage, setPastPage] = useState(1);

  const { upcoming, past, loading, error } = useUserBookings(refreshKey);

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  if (loading) return <p>Laster bookinger...</p>;
  if (error)
    return (
      <p>
        Kunne ikke hente bookinger: {error.errors?.[0]?.message || error.message}
      </p>
    );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Mine Bestillinger</h1>

      <BookingSection
        title="Kommende"
        bookings={upcoming}
        page={upcomingPage}
        setPage={setUpcomingPage}
        isUpcoming={true}
        onRefresh={triggerRefresh}
      />

      <BookingSection
        title="Tidligere"
        bookings={past}
        page={pastPage}
        setPage={setPastPage}
        isUpcoming={false}
        onRefresh={triggerRefresh}
      />
    </div>
  );
}
