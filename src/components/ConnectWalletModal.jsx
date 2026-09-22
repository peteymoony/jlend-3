import { useEffect, useState } from 'react'
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import {
  TronLinkAdapterName,
  TokenPocketAdapterName,
  WalletConnectWalletName,
  OkxWalletAdapterName,
  LedgerAdapterName,
  BinanceWalletAdapterName,
} from '../utils/tronWallets'

const wallets = [
  { name: 'TronLink', icon: 'tronlink', color: '#0C4FFF', adapterName: TronLinkAdapterName },
  { name: 'OKX', icon: 'okx', color: '#000', adapterName: OkxWalletAdapterName },
  { name: 'TokenPocket', icon: 'tokenpocket', color: '#2980FE', adapterName: TokenPocketAdapterName },
  { name: 'WalletConnect', icon: 'walletconnect', color: '#3B99FC', adapterName: WalletConnectWalletName },
  { name: 'Binance', icon: 'binance', color: '#F0B90B', adapterName: BinanceWalletAdapterName },
  { name: 'Ledger', icon: 'ledger', color: '#fff', adapterName: LedgerAdapterName }
]

export default function ConnectWalletModal({ onClose }) {
  const { connect, select, connected } = useWallet()
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectingName, setConnectingName] = useState('')

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  useEffect(() => {
    if (connected) onClose()
  }, [connected, onClose])

  const handleWalletClick = async (wallet) => {
    if (isConnecting) return
    try {
      setIsConnecting(true)
      setConnectingName(wallet.name)
      select(wallet.adapterName)
      await new Promise((resolve) => setTimeout(resolve, 100))
      await connect()
    } catch (error) {
      console.error('Wallet connection failed:', error)
    } finally {
      setIsConnecting(false)
      setConnectingName('')
    }
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'fadeIn 0.2s ease'
    }}>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'relative',
        background: '#1a1d29',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '440px',
        margin: '20px',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        animation: 'slideUp 0.3s ease',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 24px 0'
        }}>
          <h2 style={{
            fontSize: '22px',
            fontWeight: 700,
            color: '#fff'
          }}>Connect Wallet</h2>
          <button 
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.05)',
              border: 'none',
              color: 'rgba(255,255,255,0.5)',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
            }}
          >
            &times;
          </button>
        </div>

        {/* Subtitle */}
        <div style={{
          padding: '8px 24px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.5)'
          }}>Connect a wallet to use JustLend DAO</span>
          <a href="#" style={{
            fontSize: '14px',
            color: '#74a3ff',
            fontWeight: 500
          }}>User Guide</a>
        </div>

        {/* Wallet Grid */}
        <div style={{
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          marginBottom: '20px'
        }}>
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              type="button"
              disabled={isConnecting}
              onClick={() => handleWalletClick(wallet)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                padding: '20px 12px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                cursor: isConnecting ? 'not-allowed' : 'pointer',
                opacity: isConnecting && connectingName !== wallet.name ? 0.5 : 1,
                transition: 'all 0.2s',
                color: '#fff'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: wallet.color === '#fff' ? '#333' : `${wallet.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                {wallet.icon === 'tronlink' && (
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                    <path d="M16 2L4 8v16l12 6 12-6V8L16 2z" fill="#0C4FFF"/>
                    <path d="M16 8L10 11v10l6 3 6-3V11l-6-3z" fill="#fff"/>
                  </svg>
                )}
                {wallet.icon === 'okx' && (
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                    <rect width="32" height="32" rx="8" fill="#000"/>
                    <rect x="6" y="6" width="8" height="8" rx="2" fill="#fff"/>
                    <rect x="18" y="6" width="8" height="8" rx="2" fill="#fff"/>
                    <rect x="6" y="18" width="8" height="8" rx="2" fill="#fff"/>
                    <rect x="18" y="18" width="8" height="8" rx="2" fill="#fff"/>
                  </svg>
                )}
                {wallet.icon === 'tokenpocket' && (
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                    <rect width="32" height="32" rx="8" fill="#2980FE"/>
                    <text x="16" y="22" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">TP</text>
                  </svg>
                )}
                {wallet.icon === 'walletconnect' && (
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                    <rect width="32" height="32" rx="8" fill="#3B99FC"/>
                    <path d="M10 14c4-4 8-4 12 0" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M10 18c4-4 8-4 12 0" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                )}
                {wallet.icon === 'binance' && (
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                    <rect width="32" height="32" rx="8" fill="#F0B90B"/>
                    <path d="M16 6l3 3-3 3-3-3 3-3zM16 20l3 3-3 3-3-3 3-3zM10 13l3 3-3 3-3-3 3-3zM22 13l3 3-3 3-3-3 3-3z" fill="#000"/>
                  </svg>
                )}
                {wallet.icon === 'ledger' && (
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                    <rect width="32" height="32" rx="8" fill="#fff"/>
                    <rect x="8" y="8" width="6" height="6" rx="1" fill="#000"/>
                    <rect x="18" y="8" width="6" height="6" rx="1" fill="#000"/>
                    <rect x="8" y="18" width="6" height="6" rx="1" fill="#000"/>
                    <rect x="18" y="18" width="6" height="6" rx="1" fill="#000"/>
                  </svg>
                )}
              </div>
              <span style={{
                fontSize: '13px',
                fontWeight: 500,
                color: '#fff'
              }}>{connectingName === wallet.name ? 'Connecting...' : wallet.name}</span>
            </button>
          ))}
        </div>

        {/* Terms */}
        <div style={{
          padding: '0 24px 20px',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.6
          }}>
            Choosing to connect indicates that you have accepted
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '8px'
          }}>
            <a href="#" style={{
              fontSize: '13px',
              color: '#74a3ff',
              fontWeight: 500
            }}>Terms of Service</a>
            <a href="#" style={{
              fontSize: '13px',
              color: '#74a3ff',
              fontWeight: 500
            }}>Privacy Policy</a>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px 24px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: '12px'
          }}>
            Looking to have JustLend DAO support your wallet?
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px'
          }}>
            <a href="#" style={{
              fontSize: '13px',
              color: '#74a3ff',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              Read docs
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
            <a href="#" style={{
              fontSize: '13px',
              color: '#74a3ff',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              Contact us
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
