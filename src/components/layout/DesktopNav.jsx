import { NavLink } from "react-router-dom";
import DarkModeToggle from "../common/DarkModeToggle";
import AvatarMenu from "./AvatarMenu";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

export default function DesktopNav({ isLoggedIn, openModal, handleLogout }) {
  return (
    <div className="hidden md:flex items-center gap-6">
      <NavLink to="/" className={({ isActive }) =>
        isActive ? "text-blue-600 dark:text-blue-400 font-bold" : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
      }>
        Home
      </NavLink>

      <DarkModeToggle />

      {isLoggedIn ? (
        <AvatarMenu onLogout={handleLogout} />
      ) : (
        <>
          <button onClick={() => openModal("login")}><FaSignInAlt className="text-xl" /></button>
          <button onClick={() => openModal("register")}><FaUserPlus className="text-xl" /></button>
        </>
      )}
    </div>
  );
}
