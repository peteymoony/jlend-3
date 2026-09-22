import { useState, useEffect } from 'react'

const features = [
  {
    icon: 'listings',
    title: 'Progressive Listings',
    desc: 'New markets and token pairs are added progressively as they gain traction and liquidity.',
    color: '#74a3ff'
  },
  {
    icon: 'features',
    title: 'New Features on the Way',
    desc: 'Advanced trading tools, portfolio analytics, and social features are coming soon \u2014 stay tuned.',
    color: '#67dbcc'
  },
  {
    icon: 'approvals',
    title: 'First-Time Approvals',
    desc: 'JustLend uses non-custodial smart contracts. You will need to approve token spend on your first interaction.',
    color: '#ffd93d'
  }
]

export default function WelcomeModal({ onClose, onContinue, isLoading = false }) {
  const [agreed, setAgreed] = useState(false)
  const canContinue = agreed && !isLoading

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
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #1a1f2e 0%, #131721 100%)',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '480px',
        margin: '20px',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(103,219,204,0.05)',
        animation: 'slideUp 0.35s ease',
        overflow: 'hidden'
      }}>
        {/* Top gradient glow */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '200px',
          height: '120px',
          background: 'radial-gradient(ellipse at center, rgba(103,219,204,0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Logo */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '36px',
          marginBottom: '8px',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(103,219,204,0.2), rgba(116,163,255,0.2))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(103,219,204,0.2)',
            boxShadow: '0 0 30px rgba(103,219,204,0.1)'
          }}>
            <img src="/efe8a9898795c82ac1bfd14d6f8161598775b82d.svg" alt="JustLend" style={{ height: '32px' }} />
          </div>
        </div>

        {/* Title */}
        <h2 style={{
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: 700,
          color: '#fff',
          marginBottom: '28px',
          position: 'relative',
          zIndex: 1
        }}>
          Welcome to JustLend
        </h2>

        {/* Feature Cards */}
        <div style={{
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginBottom: '24px',
          position: 'relative',
          zIndex: 1
        }}>
          {features.map((feature, idx) => (
            <div key={idx} style={{
              display: 'flex',
              gap: '14px',
              padding: '16px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '14px',
              border: '1px solid rgba(255,255,255,0.05)',
              transition: 'all 0.2s'
            }} onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
            }} onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: `${feature.color}15`,
                border: `1px solid ${feature.color}25`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {feature.icon === 'listings' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={feature.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="9" y1="3" x2="9" y2="21" />
                  </svg>
                )}
                {feature.icon === 'features' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={feature.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                )}
                {feature.icon === 'approvals' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={feature.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                )}
              </div>
              <div>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: '4px'
                }}>{feature.title}</h4>
                <p style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.5
                }}>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Agreement Checkbox */}
        <div style={{
          padding: '0 24px',
          marginBottom: '20px',
          position: 'relative',
          zIndex: 1
        }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            padding: '12px',
            borderRadius: '10px',
            background: agreed ? 'rgba(103,219,204,0.05)' : 'transparent',
            border: agreed ? '1px solid rgba(103,219,204,0.2)' : '1px solid transparent',
            transition: 'all 0.2s'
          }}>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '5px',
              border: agreed ? '2px solid #67dbcc' : '2px solid rgba(255,255,255,0.2)',
              background: agreed ? '#67dbcc' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              flexShrink: 0
            }}>
              {agreed && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0a0e19" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <input 
              type="checkbox" 
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.5
            }}>
              I agree to the <a href="#" style={{ color: '#74a3ff', fontWeight: 500 }}>Terms of Use</a> and <a href="#" style={{ color: '#74a3ff', fontWeight: 500 }}>Privacy Policy</a>
            </span>
          </label>
        </div>

        {/* Continue Button */}
        <div style={{
          padding: '0 24px 28px',
          position: 'relative',
          zIndex: 1
        }}>
          <button
            type="button"
            onClick={onContinue}
            disabled={!canContinue}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '15px',
              fontWeight: 600,
              cursor: canContinue ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s',
              background: canContinue 
                ? 'linear-gradient(90deg, #67dbcc 0%, #4ecdc4 100%)' 
                : 'rgba(255,255,255,0.08)',
              color: canContinue ? '#0a0e19' : 'rgba(255,255,255,0.3)',
              boxShadow: canContinue ? '0 4px 20px rgba(103,219,204,0.25)' : 'none'
            }}
            onMouseEnter={e => {
              if (canContinue) {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 6px 25px rgba(103,219,204,0.35)'
              }
            }}
            onMouseLeave={e => {
              if (canContinue) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(103,219,204,0.25)'
              }
            }}
          >
            {isLoading ? 'Processing...' : 'Continue'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}
