import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Main layout component that wraps the entire app UI with a navbar at the top,
 * a footer at the bottom, and dynamic content rendered in between via React Router's Outlet.
 *
 * Applies global styling for light/dark modes and flex layout to fill full viewport height.
 *
 * @component
 * @returns {JSX.Element} The main layout wrapper for the app.
 */

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1F3B3C]">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default MainLayout;
