import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import HomePage from "./pages/home";
import Profile from "./pages/profile";

function App() {
  return (
    <Router>
      <Routes>
        {/* MainLayout som wrap rundt hele appen */}
        <Route element={<MainLayout />}>
          {/* Definer sider som vises inni MainLayout */}
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}


export default App;


