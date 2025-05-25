import BookingCard from "./BookingCard";
import Pagination from "../common/Pagination";

export default function BookingSection({ title, bookings, page, setPage, isUpcoming, onRefresh }) {
  const itemsPerPage = 6;
  const pageCount = Math.ceil(bookings.length / itemsPerPage);
  const paginated = bookings.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {bookings.length === 0 ? (
        <p>{isUpcoming ? "Ingen kommende bookinger." : "Ingen tidligere bookinger."}</p>
      ) : (
        <>
          <ul className="space-y-6">
            {paginated.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                isUpcoming={isUpcoming}
                onRefresh={onRefresh}
              />
            ))}
          </ul>
          <Pagination currentPage={page} totalPages={pageCount} onPageChange={setPage} />
        </>
      )}
    </section>
  );
}
