import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";
import { API_HOLIDAZE } from "../api/constant.js";
import VenueImages from "../components/venues/VenueImages.jsx";
import VenueInfo from "../components/venues/VenueInfo.jsx";
import VenueOwner from "../components/venues/VenueOwner.jsx";
import VenueBookingForm from "../components/venues/VenueBookingForm.jsx";

const VenueDetail = () => {
  const { id } = useParams();
  const { data: venue, loading, error } = useFetch(
    `${API_HOLIDAZE.VENUES}/${id}?_owner=true&_bookings=true`
  );

  if (loading) return <p>Laster sted...</p>;
  if (error) return <p>Noe gikk galt: {error.message}</p>;
  if (!venue) return <p>Fant ikke sted</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold mb-4">{venue.name}</h1>
      <VenueImages media={venue.media} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <VenueInfo venue={venue} />
        <VenueOwner owner={venue.owner} />
      </div>
      <VenueBookingForm venue={venue} />
    </div>
  );
};

export default VenueDetail;




// import React, { useState  } from "react";
// import { useParams } from "react-router-dom";
// import useFetch from "../api/useFetch";
// import { API_HOLIDAZE } from "../api/constant";
// import { doFetch } from "../api/doFetch";

// const VenueDetail = () => {
//   const { id } = useParams();
//   const { data: venue, loading, error } = useFetch(
//     `${API_HOLIDAZE.VENUES}/${id}?_owner=true&_bookings=true`
//   );

//   const [mainImageIndex, setMainImageIndex] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [bookingData, setBookingData] = useState({
//   dateFrom: "",
//   dateTo: "",
//   guests: 1,
// });
// const [bookingMessage, setBookingMessage] = useState(null);


//   if (loading) return <p>Laster sted...</p>;
//   if (error) return <p>Noe gikk galt: {error.message}</p>;
//   if (!venue) return <p>Fant ikke sted</p>;

//   const hasMedia = Array.isArray(venue.media) && venue.media.length > 0;

//   const prevImage = () => {
//     setMainImageIndex((prev) =>
//       prev === 0 ? venue.media.length - 1 : prev - 1
//     );
//   };

//   const nextImage = () => {
//     setMainImageIndex((prev) =>
//       prev === venue.media.length - 1 ? 0 : prev + 1
//     );
//   };


// const handleBookingChange = (e) => {
//   const { name, value } = e.target;
//   setBookingData((prev) => ({ ...prev, [name]: value }));
// };

// const handleBookingSubmit = async (e) => {
//   e.preventDefault();
//   setBookingMessage(null);

//   try {
//     const result = await doFetch(`${API_HOLIDAZE.BOOKINGS}`, {
//       method: "POST",
//       body: JSON.stringify({
//         ...bookingData,
//         venueId: venue.id,
//       }),
//     });

//     setBookingMessage({ type: "success", text: "Booking registrert!" });
//     console.log("Booking resultat:", result);
//   } catch (error) {
//     setBookingMessage({
//       type: "error",
//       text:
//         error?.message ||
//         "Noe gikk galt. Vennligst prøv igjen.",
//     });
//   }
// };

  

//   return (
//     <div className="p-6 max-w-5xl mx-auto space-y-6">
//       <h1 className="text-4xl font-bold mb-4">{venue.name}</h1>
//       {hasMedia && (
//         <div className="relative w-full h-80">
//           <button
//             onClick={prevImage}
//             className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 z-10"
//             aria-label="Forrige bilde"
//           >
//             ‹
//           </button>

//           <img
//             src={venue.media[mainImageIndex]?.url}
//             alt={venue.media[mainImageIndex]?.alt || "Venue Image"}
//             className="w-full h-80 object-cover rounded-lg shadow cursor-pointer transition-opacity duration-300 ease-in-out"
//             onClick={() => setIsModalOpen(true)}
//           />

//           <button
//             onClick={nextImage}
//             className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 z-10"
//             aria-label="Neste bilde"
//           >
//             ›
//           </button>
//         </div>
//       )}

//       {venue.media.length > 1 && (
//         <div className="mt-4">
//           <h2 className="text-lg font-semibold mb-2">Bildegalleri</h2>
//           <div className="flex gap-4 overflow-x-auto">
//             {venue.media.map((img, index) => (
//               <img
//                 key={index}
//                 src={img.url}
//                 alt={img.alt || `Venue image ${index + 1}`}
//                 onClick={() => setMainImageIndex(index)}
//                 className={`w-24 h-16 object-cover rounded-md cursor-pointer border-2 transition duration-200 ${
//                   index === mainImageIndex
//                     ? "border-blue-500 scale-105"
//                     : "border-transparent hover:border-gray-300"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       )}

//       {isModalOpen && (
//         <div
//           className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
//           onClick={() => setIsModalOpen(false)}
//         >
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               prevImage();
//             }}
//             className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-60 rounded-full p-4 text-4xl text-black"
//             aria-label="Forrige bilde"
//           >
//             ‹
//           </button>

//           <img
//             src={venue.media[mainImageIndex]?.url}
//             alt={venue.media[mainImageIndex]?.alt || "Stort bilde"}
//             className="max-w-3xl max-h-[80vh] object-contain rounded shadow-lg"
//             onClick={(e) => e.stopPropagation()}
//           />

//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               nextImage();
//             }}
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-60 rounded-full p-4 text-4xl text-black"
//             aria-label="Neste bilde"
//           >
//             ›
//           </button>

//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setIsModalOpen(false);
//             }}
//             className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300"
//             aria-label="Lukk modal"
//           >
//             &times;
//           </button>
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         <div>
//           <p className="text-gray-700">{venue.description}</p>
//           <p className="mt-2"><strong>Pris per natt:</strong> ${venue.price}</p>
//           <p><strong>Rating:</strong> {venue.rating} ⭐</p>
//           <p><strong>Maks gjester:</strong> {venue.maxGuests}</p>
//           <div className="mt-4 space-y-1">
//             <p>
//               <strong>Adresse:</strong> {venue.location.address}, {venue.location.zip} {venue.location.city}, {venue.location.country}
//             </p>
//             <p><strong>Kontinent:</strong> {venue.location.continent}</p>
//             {venue.location.address && (
//               <a
//                 href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
//                   `${venue.location.address}, ${venue.location.zip} ${venue.location.city}, ${venue.location.country}`
//                 )}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-500 hover:underline"
//               >
//                 📍 Se på kart
//               </a>
//             )}
//           </div>
//           <div className="mt-4 space-x-2">
//             {venue.meta.wifi && <span className="badge">Wi-Fi</span>}
//             {venue.meta.parking && <span className="badge">Parkering</span>}
//             {venue.meta.breakfast && <span className="badge">Frokost</span>}
//             {venue.meta.pets && <span className="badge">Kjæledyr tillatt</span>}
//           </div>
//         </div>

//         <div className="bg-gray-100 p-4 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-2">Eier</h2>
//           <div className="flex items-center space-x-4">
//             {venue.owner?.avatar?.url && (
//               <img
//                 src={venue.owner.avatar.url}
//                 alt={venue.owner.avatar.alt || "Eierbilde"}
//                 className="w-16 h-16 rounded-full object-cover"
//               />
//             )}
//             <div>
//               <p className="font-semibold">{venue.owner.name}</p>
//               <p className="text-sm text-gray-600">{venue.owner.email}</p>
//             </div>
//           </div>
//           {venue.owner.bio && <p className="mt-2 text-gray-700">{venue.owner.bio}</p>}
//         </div>
//       </div>

//       {/* <div className="bg-white border rounded-lg p-4 shadow mt-6">
//         <h2 className="text-xl font-semibold mb-4">Tidligere Bookinger</h2>
//         {venue.bookings && venue.bookings.length > 0 ? (
//           <ul className="space-y-2">
//             {venue.bookings.map((booking) => (
//               <li key={booking.id} className="border-b pb-2">
//                 <p><strong>Fra:</strong> {new Date(booking.dateFrom).toLocaleDateString()}</p>
//                 <p><strong>Til:</strong> {new Date(booking.dateTo).toLocaleDateString()}</p>
//                 <p><strong>Gjester:</strong> {booking.guests}</p>
//                 <p><strong>Kunde:</strong> {booking.customer.name}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>Ingen bookinger ennå.</p>
//         )}
//       </div> */}
      
//   <div className="bg-white border rounded-lg p-4 shadow mt-6">
//   <h2 className="text-xl font-semibold mb-4">Book dette stedet</h2>

//   <form onSubmit={handleBookingSubmit} className="space-y-4">
//     <div>
//       <label className="block font-medium">Fra dato</label>
//       <input
//         type="date"
//         name="dateFrom"
//         value={bookingData.dateFrom}
//         onChange={handleBookingChange}
//         required
//         className="w-full border p-2 rounded"
//       />
//     </div>
//     <div>
//       <label className="block font-medium">Til dato</label>
//       <input
//         type="date"
//         name="dateTo"
//         value={bookingData.dateTo}
//         onChange={handleBookingChange}
//         required
//         className="w-full border p-2 rounded"
//       />
//     </div>
//     <div>
//       <label className="block font-medium">Antall gjester</label>
//       <input
//         type="number"
//         name="guests"
//         value={bookingData.guests}
//         onChange={handleBookingChange}
//         min="1"
//         max={venue.maxGuests}
//         required
//         className="w-full border p-2 rounded"
//       />
//     </div>
//     <button
//       type="submit"
//       className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//     >
//       Send booking
//     </button>
//   </form>

//   {bookingMessage && (
//     <p
//       className={`mt-4 p-2 rounded ${
//         bookingMessage.type === "success"
//           ? "bg-green-100 text-green-700"
//           : "bg-red-100 text-red-700"
//       }`}
//     >
//       {bookingMessage.text}
//     </p>
//   )}
// </div>
//     </div>
//   );
// };

// export default VenueDetail;
