import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import VenueDetail from "./pages/VenueDetail";
import SellerProfile from "./pages/SellerProfile";
import AuthGuard from "./components/auth/AuthGuard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<AuthGuard>
        <Profile />
      </AuthGuard>} />
        <Route path="/venues/:id" element={<VenueDetail />} />
        <Route path="/sellers/:username" element={<AuthGuard><SellerProfile /></AuthGuard>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
