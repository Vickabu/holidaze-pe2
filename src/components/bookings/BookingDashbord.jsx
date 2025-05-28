import { useState } from "react";
import { useUserBookings } from "../../hooks/data/useUserBookings";
import BookingSection from "./BookingSection";

/**
 * Renders the dashboard for the logged-in user's bookings.
 * Displays both upcoming and past bookings in separate sections.
 *
 * Handles pagination and manual refresh after actions like canceling a booking.
 *
 * @component
 * @example
 * return (
 *   <BookingDashboard />
 * )
 */

export default function BookingDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [pastPage, setPastPage] = useState(1);
  const { upcoming, past, loading, error } = useUserBookings(refreshKey);
  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg animate-pulse">Loading bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-red-100 text-red-700 rounded-lg shadow-md">
        <p className="font-semibold text-center">
          Could not fetch bookings: {error.errors?.[0]?.message || error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto space-y-10 mt-6">

      <BookingSection
        title="Upcoming Bookings"
        bookings={upcoming}
        page={upcomingPage}
        setPage={setUpcomingPage}
        isUpcoming={true}
        onRefresh={triggerRefresh}
      />

      <BookingSection
        title="Past Bookings"
        bookings={past}
        page={pastPage}
        setPage={setPastPage}
        isUpcoming={false}
        onRefresh={triggerRefresh}
      />
    </div>
  );
}
