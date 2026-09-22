const tronGridKey = import.meta.env.VITE_TRON_GRID_KEY;

export const tron = {
  chainId: 728126428,
  name: "Tron",
  currency: "TRX",
  explorerUrl: "https://tronscan.org/",
  rpcUrl: `https://api.trongrid.io`,
};

export const chains = {
  728126428: {
    dbankId: "",
    hexChainId: "0x2b6653dc",
    name: "Tron Mainnet",
    network: "tron",
    currency: "TRX",
    explorerUrl: "https://tronscan.org/#/",
    rpcUrl: `https://api.trongrid.io`,
  },
};

export const tronWebObject = {
  fullNode: "https://api.trongrid.io",
  solidityNode: "https://api.trongrid.io",
  eventServer: "https://api.trongrid.io",
  headers: {
    "TRON-PRO-API-KEY": tronGridKey,
    "Content-Type": "application/json",
  },
};
