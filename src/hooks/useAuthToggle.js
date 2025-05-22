import { useState } from "react";

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
