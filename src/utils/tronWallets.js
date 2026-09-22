import { TronLinkAdapter, TronLinkAdapterName } from "@tronweb3/tronwallet-adapter-tronlink";
import { TokenPocketAdapter, TokenPocketAdapterName } from "@tronweb3/tronwallet-adapter-tokenpocket";
import { OkxWalletAdapter, OkxWalletAdapterName } from "@tronweb3/tronwallet-adapter-okxwallet";
import { LedgerAdapter, LedgerAdapterName } from "@tronweb3/tronwallet-adapter-ledger";
import { BinanceWalletAdapter, BinanceWalletAdapterName } from "@tronweb3/tronwallet-adapter-binance";
import { WalletConnectAdapter, WalletConnectWalletName } from "@tronweb3/tronwallet-adapter-walletconnect";

export {
  TronLinkAdapter,
  TronLinkAdapterName,
  TokenPocketAdapter,
  TokenPocketAdapterName,
  OkxWalletAdapter,
  OkxWalletAdapterName,
  LedgerAdapter,
  LedgerAdapterName,
  BinanceWalletAdapter,
  BinanceWalletAdapterName,
  WalletConnectAdapter,
  WalletConnectWalletName,
};

export function createTronAdapters() {
  return [
    new TronLinkAdapter({ checkTimeout: 3000 }),
    new TokenPocketAdapter({ checkTimeout: 3000 }),
    new WalletConnectAdapter({
      options: {
        network: "Mainnet",
        projectId: import.meta.env.VITE_PROJECT_ID,
      },
    }),
    new OkxWalletAdapter({ checkTimeout: 3000 }),
    new LedgerAdapter({ checkTimeout: 3000 }),
    new BinanceWalletAdapter({ checkTimeout: 3000 }),
  ];
}
