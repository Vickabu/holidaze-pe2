import BookingCard from "./BookingCard";
import Pagination from "../common/Pagination";

export default function BookingSection({ title, bookings, page, setPage, isUpcoming, onRefresh }) {
  const itemsPerPage = 6;
  const pageCount = Math.ceil(bookings.length / itemsPerPage);
  const paginated = bookings.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
        {title}
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 italic">
          {isUpcoming ? "No upcoming bookings yet." : "No past bookings."}
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
