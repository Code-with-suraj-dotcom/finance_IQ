import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

// Create Context
const FinanceContext = createContext();

// Custom hook for easy usage
export const useFinance = () => {
  return useContext(FinanceContext);
};

// Migration function: Convert string recurring values back to boolean
const migrateTransactions = (transactions) => {
  return transactions.map((t) => {
    // If recurring is a string, convert to boolean
    if (typeof t.recurring === "string") {
      return {
        ...t,
        recurring: t.recurring !== "none" && t.recurring !== "",
      };
    }
    // If recurring is missing or not boolean, default to false
    if (typeof t.recurring !== "boolean") {
      return { ...t, recurring: false };
    }
    return t;
  });
};

// Provider Component
export const FinanceProvider = ({ children }) => {
  // Load from localStorage (optional but recommended)
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem("transactions");
    const parsed = stored ? JSON.parse(stored) : [];
    return migrateTransactions(parsed);
  });

  const [budget, setBudget] = useState(() => {
    const stored = localStorage.getItem("budget");
    return stored ? JSON.parse(stored) : 0;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budget));
  }, [budget]);

  // Add Transaction
  const addTransaction = (data) => {
    const newTransaction = {
      id: uuidv4(),
      ...data,
      // Ensure recurring is always boolean
      recurring: data.recurring === true || data.recurring === "on",
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  // Delete Transaction
  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // Update Transaction
  const updateTransaction = (id, updatedData) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t))
    );
  };

  // Context Value
  const value = {
    transactions,
    budget,
    setBudget,
    addTransaction,
    deleteTransaction,
    updateTransaction,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};
