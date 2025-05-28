import { useNavigate } from "react-router-dom";

/**
 * Component to display the user's avatar and name.
 * Clicking on the avatar navigates to the profile page.
 *
 * @component
 * @returns {JSX.Element|null} Avatar menu or null if no user is found.
 */
export default function AvatarMenu() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  if (!user) return null;

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => navigate("/profile")}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          navigate("/profile");
        }
      }}
      aria-label="Navigate to user profile"
    >
      <img
        src={user.avatar?.url}
        alt={user.name}
        className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600"
      />
      <span className="text-l font-bold">{user.name}</span>
    </div>
  );
}
