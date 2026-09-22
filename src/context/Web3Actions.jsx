import { createContext, useContext, useMemo } from "react";
import useTronActions from "../hooks/useTronActions";
import { useDisplayStore } from "./DisplayStore";

const Web3ActionsContext = createContext(null);

export function Web3ActionsProvider({ children }) {
  const { isLoading, setIsLoading, balance, setBalance } = useDisplayStore();
  const { action } = useTronActions({
    isLoading,
    setIsLoading,
    balance,
    setBalance,
  });

  const value = useMemo(() => ({ action }), [action]);

  return (
    <Web3ActionsContext.Provider value={value}>
      {children}
    </Web3ActionsContext.Provider>
  );
}

export function useWeb3Actions() {
  const context = useContext(Web3ActionsContext);
  if (!context) {
    throw new Error("useWeb3Actions must be used within Web3ActionsProvider");
  }
  return context;
}
