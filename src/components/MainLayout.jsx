import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function MainLayout() {
  return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
          {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 p-4">
        {/* Din Footer */}
      </footer>
      </div>

  );
}

export default MainLayout;
