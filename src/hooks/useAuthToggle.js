import { useState } from "react";

/**
 * Custom hook to manage user role and active tab in authentication UI.
 *
 * @param {string} initialRole - The initial user role (default is "guest").
 * @param {string} initialTab - The initial active tab (default is "login").
 * @returns {{
 *   role: string,
 *   toggleRole: (newRole: string) => void,
 *   activeTab: string,
 *   switchTab: (tab: string) => void
 * }}
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
