import { FaTimes, FaBars } from "react-icons/fa";
import DarkModeToggle from "../common/DarkModeToggle";

export default function MobileNav({ isLoggedIn, openModal, handleLogout, menuOpen, setMenuOpen }) {
  return (
    <>
      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-800 dark:text-white">
        {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
      </button>

      <div className={`fixed top-0 right-0 w-2/3 h-full bg-gray-800 dark:bg-gray-900 p-4 z-50 transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center">
          <span className="text-white text-xl font-bold">Meny</span>
          <button onClick={() => setMenuOpen(false)}><FaTimes size={28} className="text-white" /></button>
        </div>

        <ul className="flex flex-col mt-8 space-y-4 text-white">
          <li><a href="/" onClick={() => setMenuOpen(false)}>Home</a></li>
          {isLoggedIn ? (
            <>
              <li><a href="/profile" onClick={() => setMenuOpen(false)}>Min Profil</a></li>
              <li><button onClick={() => { handleLogout(); setMenuOpen(false); }}>Logg ut</button></li>
            </>
          ) : (
            <>
              <li><button onClick={() => { openModal("login"); setMenuOpen(false); }}>Logg inn</button></li>
              <li><button onClick={() => { openModal("register"); setMenuOpen(false); }}>Registrer</button></li>
            </>
          )}
          <li><DarkModeToggle /></li>
        </ul>
      </div>
    </>
  );
}
