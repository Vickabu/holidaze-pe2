import BookingCard from "./BookingCard";
import Pagination from "../common/Pagination";

/**
 * Displays a section of bookings (either upcoming or past).
 * Handles pagination and conditional rendering based on availability.
 *
 * @component
 * @param {Object} props
 * @param {string} props.title - The title of the section (e.g., "Upcoming Bookings").
 * @param {Array} props.bookings - List of bookings to display.
 * @param {number} props.page - Current pagination page.
 * @param {Function} props.setPage - Function to update the current page.
 * @param {boolean} props.isUpcoming - Indicates if these are future bookings.
 * @param {Function} props.onRefresh - Callback to refetch bookings (used after cancellation).
 * @example
 * return (
 *   <BookingSection
 *     title="Past Bookings"
 *     bookings={past}
 *     page={1}
 *     setPage={setPage}
 *     isUpcoming={false}
 *     onRefresh={refreshBookings}
 *   />
 * )
 */
export default function BookingSection({ title, bookings, page, setPage, isUpcoming, onRefresh }) {
  const itemsPerPage = 6;
  const pageCount = Math.ceil(bookings.length / itemsPerPage);

  const paginated = bookings.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <section className="bg-white dark:bg-gray-900 rounded shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
        {title}
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 italic">
          {isUpcoming ? "You don't have any upcoming bookings yet." : "You have no past bookings."}
        </p>
      ) : (
        <>
          <ul className="space-y-6 mb-6">
            {paginated.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                isUpcoming={isUpcoming}
                onRefresh={onRefresh}
              />
            ))}
          </ul>

          <div className="flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={pageCount}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </section>
  );
}
