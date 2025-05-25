import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }) {
  const { user, isLoading, setShowAuthModal, setAuthModalTab } = useAuth();
  const location = useLocation();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      setAuthModalTab("login");
      setShowAuthModal(true);
      setRedirecting(true);
    }
  }, [isLoading, user, setAuthModalTab, setShowAuthModal]);

  if (isLoading) {
    return null; 
  }

  if (!user && redirecting) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

