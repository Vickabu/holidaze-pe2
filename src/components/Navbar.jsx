import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle'; 
import { FaBars, FaTimes, FaUser, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const location = useLocation();

 
  const isActive = (path) => location.pathname === path;

 
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false); 
    setMenuOpen(false); 
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white dark:bg-gray-900 shadow-md' : 'bg-white/70 dark:bg-gray-900/70 backdrop-blur'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo - need to fine one*/}
        <div className="text-2xl font-bold text-gray-800 dark:text-white">
          Holidaze
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="/" className={`${isActive('/') ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}>
            Home
          </a>
          <a href="/profile" className={`${isActive('/profile') ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}>
            Profile
          </a>


          {isLoggedIn ? (
            <>
              <a href="/profile" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <FaUser className="text-xl" />
              </a>
              <button onClick={handleLogout} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <FaSignOutAlt className="text-xl" />
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <FaSignInAlt className="text-xl" />
              </a>
              <a href="/signup" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <FaUserPlus className="text-xl" />
              </a>
              <DarkModeToggle />
            </>
            
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-800 dark:text-white">
            {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
          </button>
        </div>
      </div>

      <div className={`fixed top-0 right-0 w-2/3 bg-gray-800 dark:bg-gray-900 p-4 transition-transform duration-300 ${menuOpen ? 'transform translate-x-0' : 'transform translate-x-full'}`}>
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            Holidaze
          </div>
          <button onClick={toggleMenu} className="text-white">
            <FaTimes size={30} />
          </button>
        </div>

        <ul className="flex flex-col mt-8 space-y-4 text-white">
          <li>
            <a href="/" className={`${isActive('/') ? 'font-bold' : ''}`}>
              Home
            </a>
          </li>
          <li>
            <a href="/profile" className={`${isActive('/profile') ? 'font-bold' : ''}`}>
              Profile
            </a>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <a href="/profile" className="text-white">Profile</a>
              </li>
              <li>
                <button onClick={handleLogout} className="text-white">Log out</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/login" className="text-white">Login</a>
              </li>
              <li>
                <a href="/signup" className="text-white">Sign Up</a>
              </li>
            </>
          )}

          <li className="mt-4">
            <DarkModeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
}
