import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    exclude: [
      'es-toolkit',
      '@tronweb3/tronwallet-adapters',
      '@tronweb3/tronwallet-adapter-react-hooks',
      '@tronweb3/tronwallet-adapter-tronlink',
      '@tronweb3/tronwallet-adapter-tokenpocket',
      '@tronweb3/tronwallet-adapter-okxwallet',
      '@tronweb3/tronwallet-adapter-ledger',
      '@tronweb3/tronwallet-adapter-binance',
      '@tronweb3/tronwallet-adapter-walletconnect',
      '@tronweb3/walletconnect-tron',
      '@walletconnect/core',
      '@walletconnect/sign-client',
      '@walletconnect/utils',
      '@walletconnect/modal',
    ],
  },
})
