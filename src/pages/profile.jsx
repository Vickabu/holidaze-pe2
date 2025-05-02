import { useEffect, useState } from "react";

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
      {/* Profilinfo */}
      <h1 className="text-2xl font-bold mb-4">Profil</h1>
      <div className="flex items-center gap-4 mb-6">
        <img
          src={user.avatar?.url}
          alt={user.avatar?.alt || "Brukeravatar"}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{user.name}</p>
          <p>{user.email}</p>
          <p>Rolle: {user.venueManager ? "Venue Manager" : "Customer"}</p>
        </div>
      </div>

      {/* Dashboard-del */}
      {user.venueManager ? (
        <VenueDashboard user={user} />
      ) : (
        <CustomerDashboard user={user} />
      )}
    </div>
  );
}

// Venue Manager Dashboard
function VenueDashboard() {
  return (
    <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Ditt venue dashboard</h2>
      <p>Her kan du administrere dine venues, se bookinger osv.</p>
      {/* TODO: List venues, bookings etc. */}
    </div>
  );
}

// Customer Dashboard
function CustomerDashboard() {
  return (
    <div className="bg-green-50 dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Dine bookinger</h2>
      <p>Her vises kommende og tidligere bookinger.</p>
      {/* TODO: List bookings */}
    </div>
  );
}
