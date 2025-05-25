import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import DarkModeToggle from "../common/DarkModeToggle";
import AvatarMenu from "./AvatarMenu";


export default function DesktopNav({ isLoggedIn, openModal, handleLogout }) {
  return (
    <div className="hidden md:flex items-center gap-6 text-[#1F3B3C] dark:text-[#F4E9DC]">
      {isLoggedIn ? (
        <>
          <AvatarMenu />

<button
  onClick={handleLogout}
  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-semibold hover:bg-red-600 rounded hover:text-black transition-colors text-sm cursor-pointer"
>
  <FaSignOutAlt />
  Logg ut
</button>
        </>
      ) : (
        <>
          <button onClick={() => openModal("login")}>
            <FaSignInAlt className="text-2xl text-[#1F3B3C] dark:text-[#F4E9DC]" />
          </button>
          <button onClick={() => openModal("register")}>
            <FaUserPlus className="text-2xl text-[#1F3B3C] dark:text-[#F4E9DC]" />
          </button>
        </>
      )}
      <DarkModeToggle />
    </div>
  );
}
