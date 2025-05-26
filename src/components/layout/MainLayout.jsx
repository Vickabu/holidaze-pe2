import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#101920] text-[#1F3B3C] dark:text-[#F4E9DC]">
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
