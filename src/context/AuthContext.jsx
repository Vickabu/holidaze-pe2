import React, { createContext, useContext, useState, useEffect } from "react";
import { saveUserToStorage, clearUserFromStorage } from "../utils/localStorageHelpers";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState("login");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) setUser(JSON.parse(storedUser));
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    saveUserToStorage(userData);
    setUser({
      name: userData.name,
      email: userData.email,
      avatar: userData.avatar,
      banner: userData.banner,
      venueManager: userData.venueManager,
    });
  };

  const logout = () => {
    clearUserFromStorage();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, showAuthModal, setShowAuthModal, authModalTab, setAuthModalTab, isLoading }}>
      {!isLoading && children} 
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
