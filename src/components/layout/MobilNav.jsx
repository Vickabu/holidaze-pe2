import { FaTimes, FaBars, FaSignOutAlt, FaHome, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import DarkModeToggle from "../common/DarkModeToggle";
import AvatarMenu from "./AvatarMenu";

/**
 * Mobile navigation menu component.
 *
 * @param {Object} props
 * @param {boolean} props.isLoggedIn - Whether the user is logged in.
 * @param {function(string):void} props.openModal - Function to open auth modals.
 * @param {function():void} props.handleLogout - Function to log out the user.
 * @param {boolean} props.menuOpen - Whether the mobile menu is open.
 * @param {function(boolean):void} props.setMenuOpen - Setter for the menu open state.
 * @returns {JSX.Element}
 */
export default function MobileNav({ isLoggedIn, openModal, handleLogout, menuOpen, setMenuOpen }) {
  return (
    <>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-[#1F3B3C] dark:text-[#F4E9DC]"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        type="button"
      >
        {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
      </button>

      <div
        className={`fixed top-0 right-0 w-2/3 h-screen bg-[#F4E9DC] dark:bg-[#1F3B3C] p-4 z-50 transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center">
          <span className="text-[#1F3B3C] dark:text-[#F4E9DC] text-xl font-bold">Menu</span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            type="button"
          >
            <FaTimes size={28} className="text-[#1F3B3C] dark:text-[#F4E9DC]" />
          </button>
        </div>

        <ul className="flex flex-col mt-8 space-y-6 text-[#1F3B3C] dark:text-[#F4E9DC] font-semibold">
          <li>
            <a
              href="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <FaHome />
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
                  className="flex items-center gap-2 px-4 py-2 rounded border border-black bg-red-300 text-black font-semibold hover:bg-red-400 transition-colors text-sm cursor-pointer hover:shadow-md"
                  type="button"
                  aria-label="Log out"
                >
                  <FaSignOutAlt />
                  Log Out
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
                  className="flex items-center gap-2"
                  type="button"
                  aria-label="Sign in"
                >
                  <FaSignInAlt />
                  Sign in
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    openModal("register");
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2"
                  type="button"
                  aria-label="Register"
                >
                  <FaUserPlus />
                  Register
                </button>
              </li>
              <li>
                <DarkModeToggle />
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}
