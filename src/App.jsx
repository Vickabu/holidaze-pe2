import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import HomePage from "./pages/home";
import Profile from "./pages/profile";
import VenueDetail from "./pages/VenueDetail";
import SellerPublicProfile from "./pages/SellerPublicProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/venues/:id" element={<VenueDetail />} />
          <Route path="/sellers/:username" element={<SellerPublicProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}


export default App;


