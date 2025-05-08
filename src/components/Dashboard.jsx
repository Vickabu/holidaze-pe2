// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userInfo = localStorage.getItem("userInfo");
//     if (!userInfo) {
//       navigate("/"); // Ikke logget inn
//       return;
//     }

//     const parsedUser = JSON.parse(userInfo);
//     setUser(parsedUser);
//   }, [navigate]);

//   if (!user) return <p>Laster brukerinfo...</p>;

//   return user.venueManager ? (
//     <VenueDashboard user={user} />
//   ) : (
//     <CustomerDashboard user={user} />
//   );
// }