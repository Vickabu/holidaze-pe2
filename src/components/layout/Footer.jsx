import { useState, useEffect } from 'react';
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

/**
 * Footer component that displays the Holidaze logo, social media icons,
 * and copyright information.
 * 
 * The footer fades in when scrolled into view (within 100px of viewport bottom).
 *
 * @component
 * @returns {JSX.Element} The footer section of the page.
 */
export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footerPosition = document.getElementById('footer').getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      setIsVisible(footerPosition < windowHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = useNavigate();

  return (
    <footer
      id="footer"
      className={`transition-opacity duration-700 py-8 mt-10 ${isVisible ? 'opacity-100' : 'opacity-0'} 
        bg-[#F4E9DC] dark:bg-[#1F3B3C] text-[#1F3B3C] dark:text-[#F4E9DC]`}
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <img
            src={"/Holidaze-logo.png"}
            alt="Holidaze logo"
            className="w-32 cursor-pointer dark:bg-[#F4E9DC] rounded"
            onClick={() => navigate("/")}
          />

          <div className="flex space-x-6 mb-4 md:mb-0 sm:mt-4">
            <a href="#" className="text-gray-800 dark:text-gray-300 hover:text-gray-400 dark:hover:text-gray-500" aria-label="Twitter">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-800 dark:text-gray-300 hover:text-gray-400 dark:hover:text-gray-500" aria-label="Instagram">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-800 dark:text-gray-300 hover:text-gray-400 dark:hover:text-gray-500" aria-label="LinkedIn">
              <FaLinkedin size={24} />
            </a>
            <a href="#" className="text-gray-800 dark:text-gray-300 hover:text-gray-400 dark:hover:text-gray-500" aria-label="Facebook">
              <FaFacebook size={24} />
            </a>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 mt-6 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Holidaze.
        </div>
      </div>
    </footer>
  );
}
