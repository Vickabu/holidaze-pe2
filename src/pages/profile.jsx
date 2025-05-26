import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import VenueDashboard from "../components/venues/VenueDashboard";
import BookingDashboard from "../components/bookings/BookingDashbord";
import UserInfoCard from "../components/user/UserInfoCard";

export default function Profile() {
  const { username } = useParams(); 
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("bookings");

  useEffect(() => {
    const userData = localStorage.getItem("userInfo");
    if (userData) {
      const parsed = JSON.parse(userData);
      setCurrentUser(parsed);

      // Set default tab for venue managers
      if (parsed.venueManager) {
        setActiveTab("venues");
      }
    }
  }, []);

  if (!currentUser) return <p>Loading brukerdata...</p>;

  const isOwnProfile = !username || username === currentUser.name;
  if (!isOwnProfile) return <Navigate to="/profile" replace />;

  const isVenueManager = currentUser.venueManager;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <UserInfoCard />

      {/* Tabs */}
      <div className="border-b border-gray-300 dark:border-gray-700 flex space-x-4">
        {isVenueManager && (
          <button
            onClick={() => setActiveTab("venues")}
            className={`pb-2 font-medium ${
              activeTab === "venues"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 dark:text-gray-400 hover:text-blue-500"
            }`}
          >
            My Venues
          </button>
        )}
        <button
          onClick={() => setActiveTab("bookings")}
          className={`pb-2 font-medium ${
            activeTab === "bookings"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 dark:text-gray-400 hover:text-blue-500"
          }`}
        >
          My Bookings
        </button>
      </div>

      {/* Tab content */}
      <div className="mt-4">
        {activeTab === "venues" && isVenueManager && (
          <VenueDashboard user={currentUser} />
        )}
        {activeTab === "bookings" && (
          <BookingDashboard user={currentUser} />
        )}
      </div>
    </div>
  );
}
