import { useEffect, useState } from "react";
import VenueDashboard from "../components/venues/VenueDashboard";
import BookingDashboard from "../components/bookings/BookingDashbord";
import UserInfoCard from "../user/UserInfoCard";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("userInfo");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) return <p>Laster brukerdata...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profil</h1>
      
      
      <UserInfoCard user={user} />


      {user.venueManager ? (
        <VenueDashboard user={user} />
      ) : (
        <BookingDashboard user={user} />
      )}
    </div>
  );
}
