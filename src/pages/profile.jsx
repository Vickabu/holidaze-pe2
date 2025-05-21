import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import VenueDashboard from "../components/venues/VenueDashboard";
import BookingDashboard from "../components/bookings/BookingDashbord";
import UserInfoCard from "../user/UserInfoCard";

export default function Profile() {
  const { username } = useParams(); // Hentes fra /profile/:username
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("userInfo");
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  if (!currentUser) return <p>Laster brukerdata...</p>;

  const isOwnProfile = !username || username === currentUser.name;
  const profileUser = currentUser; // Vi støtter kun egen profil foreløpig

  // Hvis brukeren prøver å se en annen sin profil, redirect til egen
  if (!isOwnProfile) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profil</h1>

      <UserInfoCard user={profileUser} />

      {profileUser.venueManager ? (
        <VenueDashboard user={profileUser} />
      ) : (
        <BookingDashboard user={profileUser} />
      )}
    </div>
  );
}
