import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../common/Modal";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import { useAuth } from "../../context/AuthContext";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobilNav";
import { useAuthToggle } from "../../hooks/useAuthToggle";

/**
 * Navbar component for site navigation including auth modal handling,
 * responsive navigation menus (desktop and mobile), and scroll effects.
 *
 * @component
 * @returns {JSX.Element} The navbar UI component.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    user,
    login,
    logout,
    showAuthModal,
    setShowAuthModal,
    authModalTab,
    setAuthModalTab,
  } = useAuth();
  const isLoggedIn = !!user;
  const { switchTab, role, toggleRole } = useAuthToggle();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Handle user logout and redirect to homepage.
   */
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  /**
   * Open the authentication modal and switch to the specified tab (login or register).
   *
   * @param {string} tab - The auth modal tab to open ("login" or "register").
   */
  const openModal = (tab) => {
    switchTab(tab);
    setAuthModalTab(tab);
    setShowAuthModal(true);
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#1F3B3C]/80 shadow-md backdrop-blur" : "bg-[#1F3B3C]"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
          <img
            src={"/Holidaze-logo.png"}
            alt="Holidaze logo"
            className="w-32 h-auto cursor-pointer bg-[#F4E9DC] rounded"
            onClick={() => navigate("/")}
          />

          <DesktopNav
            isLoggedIn={isLoggedIn}
            openModal={openModal}
            handleLogout={handleLogout}
          />

          <MobileNav
            isLoggedIn={isLoggedIn}
            openModal={openModal}
            handleLogout={handleLogout}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
        </div>
      </nav>

      <Modal
        show={showAuthModal}
        onClose={() => {
          setShowAuthModal(false);
          setRegistrationSuccess(false);
        }}
      >
        <div className="flex mb-4 space-x-4 justify-center">
          <button
            onClick={() => {
              switchTab("login");
              setAuthModalTab("login");
            }}
            className={`p-2 ${
              authModalTab === "login"
                ? "border-b-2 border-[#1F3B3C] font-bold"
                : ""
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              switchTab("register");
              setAuthModalTab("register");
            }}
            className={`p-2 ${
              authModalTab === "register"
                ? "border-b-2 border-[#1F3B3C] font-bold"
                : ""
            }`}
          >
            Register
          </button>
        </div>

        {authModalTab === "login" ? (
          <LoginForm
            role={role}
            toggleRole={toggleRole}
            onSuccess={(userData) => {
              login(userData);
              setShowAuthModal(false);
              navigate("/profile");
            }}
          />
        ) : (
          <>
            <RegisterForm
              role={role}
              toggleRole={toggleRole}
              onSuccess={() => {
                setRegistrationSuccess(true);
                switchTab("login");
                setAuthModalTab("login");
              }}
            />
            {registrationSuccess && (
              <p className="mt-4 text-green-600 text-center">
                Your account has been successfully created. Please log in to get
                started.
              </p>
            )}
          </>
        )}
      </Modal>
    </>
  );
}
