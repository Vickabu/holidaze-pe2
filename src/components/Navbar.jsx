import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Funksjon for å sjekke aktiv side
  const isActive = (path) => location.pathname === path;

  // Scroll behavior for navbar bakgrunn
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

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white dark:bg-gray-900 shadow-md' : 'bg-white/70 dark:bg-gray-900/70 backdrop-blur'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800 dark:text-white">
          Holidaze
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="/" className={`${isActive('/') ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}>
            Home
          </a>
          <a href="/profile" className={`${isActive('/profile') ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}>
            Profile
          </a>

          {/* Dark Mode Toggle */}
          <DarkModeToggle /> {/* Bruk DarkModeToggle her */}
        </div>
      </div>
    </nav>
  );
}
