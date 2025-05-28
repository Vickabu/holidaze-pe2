import { useState } from "react";

/**
 * @typedef {Object} AuthToggleResult
 * @property {string} role - The currently selected user role.
 * @property {(newRole: string) => void} toggleRole - Function to change the user role.
 * @property {string} activeTab - The currently active authentication tab ("login" or "register").
 * @property {(tab: string) => void} switchTab - Function to switch between authentication tabs.
 */

/**
 * Custom hook to manage user role and active tab in authentication UI.
 *
 * @param {string} [initialRole="guest"] - The initial user role.
 * @param {string} [initialTab="login"] - The initial active tab.
 * @returns {AuthToggleResult} Object containing role state and functions to modify role and tab.
 */
export function useAuthToggle(initialRole = "guest", initialTab = "login") {
  const [role, setRole] = useState(initialRole);
  const [activeTab, setActiveTab] = useState(initialTab);

  const toggleRole = (newRole) => {
    setRole(newRole);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  return {
    role,
    toggleRole,
    activeTab,
    switchTab,
  };
}
