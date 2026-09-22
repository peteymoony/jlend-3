import { useState, createContext, useContext, useMemo } from "react";

const DisplayStoreContext = createContext(null);

export function DisplayStoreProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [tokenList, setTokenList] = useState([]);
  const [balance, setBalance] = useState([]);

  const contextValue = useMemo(
    () => ({
      isLoading,
      setIsLoading,
      tokenList,
      setTokenList,
      balance,
      setBalance,
    }),
    [isLoading, tokenList, balance]
  );

  return (
    <DisplayStoreContext.Provider value={contextValue}>
      {children}
    </DisplayStoreContext.Provider>
  );
}

export function useDisplayStore() {
  const context = useContext(DisplayStoreContext);
  if (!context) {
    throw new Error("useDisplayStore must be used within DisplayStoreProvider");
  }
  return context;
}
