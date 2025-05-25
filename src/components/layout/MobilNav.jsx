import { FaTimes, FaBars, FaSignOutAlt } from "react-icons/fa";
import DarkModeToggle from "../common/DarkModeToggle";
import AvatarMenu from "./AvatarMenu";

export default function MobileNav({
  isLoggedIn,
  openModal,
  handleLogout,
  menuOpen,
  setMenuOpen,
}) {
  return (
    <>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-[#1F3B3C] dark:text-[#F4E9DC]"
      >
        {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
      </button>

      <div
        className={`fixed top-0 right-0 w-2/3 h-screen bg-[#F4E9DC] dark:bg-[#1F3B3C] p-4 z-50 transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center">
          <span className="text-[#1F3B3C] dark:text-[#F4E9DC] text-xl font-bold">
            Menu
          </span>
          <button onClick={() => setMenuOpen(false)}>
            <FaTimes
              size={28}
              className="text-[#1F3B3C] dark:text-[#F4E9DC]"
            />
          </button>
        </div>

        <ul className="flex flex-col mt-8 space-y-6 text-[#1F3B3C] dark:text-[#F4E9DC] font-semibold">
          <li>
            <a href="/" onClick={() => setMenuOpen(false)}>
              Home
            </a>
          </li>

          {isLoggedIn ? (
            <>
              <li onClick={() => setMenuOpen(false)}>
                <AvatarMenu />
              </li>
              <li>
            <DarkModeToggle />
          </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-semibold hover:bg-red-600 rounded hover:text-black transition-colors text-sm cursor-pointer"
                >
                  <FaSignOutAlt />
                  Logg ut
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  onClick={() => {
                    openModal("login");
                    setMenuOpen(false);
                  }}
                >
                  Sign in
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    openModal("register");
                    setMenuOpen(false);
                  }}
                >
                  Register
                </button>
              </li>
            </>
          )}
        
        </ul>
      </div>
    </>
  );
}
