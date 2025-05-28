import React, { createContext, useContext, useState, useEffect } from "react";
import { saveUserToStorage, clearUserFromStorage } from "../utils/localStorageHelpers";

const AuthContext = createContext();

/**
 * Provides authentication context to the React app.
 * Manages user state, login/logout, and auth modal visibility.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Child components to render inside the provider.
 * @returns {JSX.Element} AuthContext provider component.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState("login");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user info from localStorage on mount
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) setUser(JSON.parse(storedUser));
    setIsLoading(false);
  }, []);

  /**
   * Logs in a user by saving user data to localStorage and updating context state.
   *
   * @param {Object} userData - User data object.
   * @param {string} userData.name - User's name.
   * @param {string} userData.email - User's email.
   * @param {string} [userData.avatar] - URL to user's avatar image.
   * @param {string} [userData.banner] - URL to user's banner image.
   * @param {boolean} [userData.venueManager] - Venue manager status.
   */
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

  /**
   * Logs out the user by clearing localStorage and resetting user state.
   */
  const logout = () => {
    clearUserFromStorage();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        showAuthModal,
        setShowAuthModal,
        authModalTab,
        setAuthModalTab,
        isLoading,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access auth context values.
 *
 * @returns {{
 *   user: Object|null,
 *   setUser: Function,
 *   login: Function,
 *   logout: Function,
 *   showAuthModal: boolean,
 *   setShowAuthModal: Function,
 *   authModalTab: string,
 *   setAuthModalTab: Function,
 *   isLoading: boolean
 * }}
 */
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
