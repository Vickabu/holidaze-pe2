import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  // Sjekk for eksisterende innstilling i localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      return savedMode ? JSON.parse(savedMode) : false;
    }
    return false;
  });

  // Bruker useEffect for å sette body-klassen ved initialisering
  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Funksjon for å toggles dark mode og lagre det i localStorage
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
      className="p-2 rounded-full border-2 border-gray-300 dark:border-gray-700">
      {isDarkMode ? (
        <span className="text-gray-900 dark:text-white">🌙</span> // Måneikon for mørk modus
      ) : (
        <span className="text-yellow-500 dark:text-gray-300">🌞</span> // Solikon for lys modus
      )}
    </button>
  );
};

export default DarkModeToggle;
