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
  const root = document.documentElement;
  root.classList.toggle('dark', isDarkMode);
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
  className="p-2 rounded-full border-2 border-[#527577] dark:border-[#F4E9DC]">
  {isDarkMode ? (
    <FaMoon className="text-[#F4E9DC]" />
  ) : (
    <FaSun className="text-[#be7a2b]" /> 
  )}
</button>
  );
};

export default DarkModeToggle;
