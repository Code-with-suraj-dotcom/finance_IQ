import { createContext, useContext, useState } from "react";

// Create Context
const UIContext = createContext();

// Custom hook for easy usage
export const useUI = () => {
  return useContext(UIContext);
};

// Provider Component
export const UIProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <UIContext.Provider value={{ isSidebarOpen, setIsSidebarOpen, toggleSidebar }}>
      {children}
    </UIContext.Provider>
  );
};
