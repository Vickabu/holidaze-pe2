import { useNavigate } from "react-router-dom";

export default function AvatarMenu({ onLogout }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  if (!user) return null;

  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/profile")}>
      <img
        src={user.avatar?.url || "/default-avatar.png"}
        alt={user.name}
        className="w-8 h-8 rounded-full object-cover border border-gray-300 dark:border-gray-600"
      />
      <button onClick={onLogout} className="text-sm text-red-500 hover:underline ml-2">Logg ut</button>
    </div>
  );
}
