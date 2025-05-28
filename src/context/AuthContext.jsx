import React, { createContext, useContext, useState, useEffect } from "react";
import {
  saveUserToStorage,
  clearUserFromStorage,
} from "../utils/localStorageHelpers";

/**
 * @typedef {Object} User
 * @property {string} name
 * @property {string} email
 * @property {string} [avatar]
 * @property {string} [banner]
 * @property {boolean} [venueManager]
 */

const AuthContext = createContext({
  user: /** @type {User|null} */ (null),
  setUser: () => {},
  login: () => {},
  logout: () => {},
  showAuthModal: false,
  setShowAuthModal: () => {},
  authModalTab: "login",
  setAuthModalTab: () => {},
  isLoading: true,
});

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
    try {
      const storedUser = localStorage.getItem("userInfo");
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch {
      // fail silently or clear invalid storage if needed
    }
    setIsLoading(false);
  }, []);

  /**
   * Logs in a user by saving user data to localStorage and updating context state.
   *
   * @param {User} userData - User data object.
   */
  const login = (userData) => {
    saveUserToStorage(userData);
    setUser(userData);
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
 *   user: User|null,
 *   setUser: React.Dispatch<React.SetStateAction<User|null>>,
 *   login: (userData: User) => void,
 *   logout: () => void,
 *   showAuthModal: boolean,
 *   setShowAuthModal: React.Dispatch<React.SetStateAction<boolean>>,
 *   authModalTab: string,
 *   setAuthModalTab: React.Dispatch<React.SetStateAction<string>>,
 *   isLoading: boolean
 * }}
 */
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
