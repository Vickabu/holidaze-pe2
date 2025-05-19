import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      return savedMode ? JSON.parse(savedMode) : false;
    }
    return false;
  });

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <button
  onClick={toggleDarkMode}
  className="p-2 rounded-full border-2 border-gray-400 dark:border-gray-300">
  {isDarkMode ? (
    <FaMoon className="text-gray-900 dark:text-white" /> // Måneikon for mørk modus
  ) : (
    <FaSun className="text-yellow-600 dark:text-gray-300" /> // Solikon for lys modus
  )}
</button>
  );
};

export default DarkModeToggle;
