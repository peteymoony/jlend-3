import { StrictMode, useMemo } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { WalletProvider } from "@tronweb3/tronwallet-adapter-react-hooks";
import { DisplayStoreProvider } from "./context/DisplayStore";
import { Web3ActionsProvider } from "./context/Web3Actions";
import { createTronAdapters } from "./utils/tronWallets";
import { initLogRocket } from "./config/logrocket";

initLogRocket();

function AppWithWalletProvider() {
  const adapters = useMemo(() => createTronAdapters(), []);

  return (
    <WalletProvider adapters={adapters} autoConnect>
      <DisplayStoreProvider>
        <Web3ActionsProvider>
          <App />
        </Web3ActionsProvider>
      </DisplayStoreProvider>
    </WalletProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWithWalletProvider />
  </StrictMode>
);
