import { useState, useEffect } from 'react';
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import DarkModeToggle from './DarkModeToggle';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footerPosition = document.getElementById('footer').getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (footerPosition < windowHeight - 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer
      id="footer"
      className={`transition-opacity duration-700 py-8 mt-10 ${isVisible ? 'opacity-100' : 'opacity-0'} 
        dark:bg-gray-900 text-gray-800 bg-white dark:text-white`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo - have to find one */}
          <div className="text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">
            Holidaze
          </div>

          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-gray-800 dark:text-gray-300 hover:text-gray-400 dark:hover:text-gray-500">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-800 dark:text-gray-300 hover:text-gray-400 dark:hover:text-gray-500">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-800 dark:text-gray-300 hover:text-gray-400 dark:hover:text-gray-500">
              <FaLinkedin size={24} />
            </a>
            <a href="#" className="text-gray-800 dark:text-gray-300 hover:text-gray-400 dark:hover:text-gray-500">
              <FaFacebook size={24} />
            </a>
          </div>

          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="/about" className="text-gray-800 dark:text-gray-300 hover:text-gray-400 dark:hover:text-gray-500">About Us</a>
            <a href="/privacy" className="text-gray-800 dark:text-gray-300 hover:text-gray-400 dark:hover:text-gray-500">Privacy Policy</a>
            <a href="/terms" className="text-gray-800 dark:text-gray-300 hover:text-gray-400 dark:hover:text-gray-500">Terms of Service</a>
          </div>

          {/* Not sure I should keep*/}
          <div className="mt-4 md:mt-0">
            <DarkModeToggle />
          </div>
        </div>

        {/* Copyright he he */}
        <div className="text-center text-sm text-gray-400 mt-6 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Holidaze. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
