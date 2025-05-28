import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import DarkModeToggle from "../common/DarkModeToggle";
import AvatarMenu from "./AvatarMenu";

/**
 * Desktop navigation bar component.
 *
 * @param {Object} props
 * @param {boolean} props.isLoggedIn - Whether the user is logged in.
 * @param {function(string):void} props.openModal - Function to open auth modals ("login" or "register").
 * @param {function():void} props.handleLogout - Function to log out the user.
 * @returns {JSX.Element}
 */
export default function DesktopNav({ isLoggedIn, openModal, handleLogout }) {
  return (
    <div className="hidden md:flex items-center gap-6 text-[#1F3B3C] dark:text-[#F4E9DC]">
      {isLoggedIn ? (
        <>
          <AvatarMenu />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded border border-black bg-red-300 text-black font-semibold hover:bg-red-400 transition-colors text-sm cursor-pointer hover:shadow-md"
            aria-label="Log out"
            type="button"
          >
            <FaSignOutAlt />
            Log Out
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => openModal("login")}
            className="text-2xl text-[#1F3B3C] dark:text-[#F4E9DC]"
            aria-label="Open login modal"
            type="button"
          >
            <FaSignInAlt />
          </button>
          <button
            onClick={() => openModal("register")}
            className="text-2xl text-[#1F3B3C] dark:text-[#F4E9DC]"
            aria-label="Open register modal"
            type="button"
          >
            <FaUserPlus />
          </button>
        </>
      )}
      <DarkModeToggle />
    </div>
  );
}
