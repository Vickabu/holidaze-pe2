import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AuthGuard({ children }) {
  const { user, setShowAuthModal, setAuthModalTab } = useAuth();
  const location = useLocation();

  if (!user) {
    setAuthModalTab("login");
    setShowAuthModal(true);

    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
