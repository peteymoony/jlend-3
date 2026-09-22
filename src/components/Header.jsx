import { useState, useRef, useEffect } from 'react'

const launchOptions = [
  { title: 'Launch App', subtitle: 'SBM V1', action: 'wallet' },
  { title: 'Launch V2', subtitle: 'SBM V2', action: 'welcome' }
]

export default function Header({ onLaunchApp, onLaunchV2 }) {
  const [showLaunchDropdown, setShowLaunchDropdown] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const headerRef = useRef(null)
  const closeTimerRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setShowLaunchDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  const openLaunchMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setShowLaunchDropdown(true)
  }

  const scheduleCloseLaunchMenu = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    closeTimerRef.current = setTimeout(() => {
      setShowLaunchDropdown(false)
      closeTimerRef.current = null
    }, 220)
  }

  const handleLaunchOption = (action) => {
    setShowLaunchDropdown(false)
    if (action === 'wallet') {
      onLaunchApp()
    } else if (action === 'welcome') {
      onLaunchV2()
    }
  }

  return (
    <header ref={headerRef} style={{
      width: '100%',
      position: 'fixed',
      top: 0,
      zIndex: 999,
      padding: '0 40px'
    }}>
      <div className="adaptive" style={{
        position: 'relative',
        padding: '20px 0',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1440px'
      }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <img src="/efe8a9898795c82ac1bfd14d6f8161598775b82d.svg" alt="JustLend DAO" style={{ height: '32px' }} />
        </a>

        {/* Launch Button with Dropdown */}
        <div 
          style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end' }}
          onMouseEnter={openLaunchMenu}
          onMouseLeave={scheduleCloseLaunchMenu}
        >
          <button 
            type="button"
            aria-expanded={showLaunchDropdown}
            aria-haspopup="menu"
            onClick={() => setShowLaunchDropdown((open) => !open)}
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: 'linear-gradient(90deg, #67dbcc 0%, #4ecdc4 100%)',
              color: '#0a0e19',
              fontSize: '14px',
              fontWeight: 600,
              borderRadius: '10px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              border: 'none',
              fontFamily: "'Inter', sans-serif"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(103,219,204,0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Launch App
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </button>

          {/* Launch Dropdown */}
          {showLaunchDropdown && (
            <div
              role="menu"
              style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              paddingTop: '8px',
              width: '200px',
              zIndex: 1001
            }}>
            <div style={{
              background: 'rgba(19,23,33,0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              overflow: 'hidden',
              animation: 'fadeIn 0.2s ease'
            }}>
              {launchOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLaunchOption(opt.action)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '16px',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: idx < launchOptions.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'left'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#fff',
                    fontFamily: "'Inter', sans-serif"
                  }}>{opt.title}</span>
                  <span style={{
                    fontSize: '12px',
                    color: '#9aa3bc',
                    marginTop: '4px',
                    fontFamily: "'Inter', sans-serif"
                  }}>{opt.subtitle}</span>
                </button>
              ))}
            </div>
            </div>
          )}
        </div>

        {/* Mobile burger */}
        <button 
          className="header-burger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            padding: '8px',
            background: 'none',
            border: 'none'
          }}
        >
          <span style={{ width: '24px', height: '2px', background: '#fff', borderRadius: '2px' }} />
          <span style={{ width: '24px', height: '2px', background: '#fff', borderRadius: '2px' }} />
          <span style={{ width: '24px', height: '2px', background: '#fff', borderRadius: '2px' }} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(10,14,25,0.98)',
          zIndex: 998,
          padding: '80px 24px 24px',
          overflowY: 'auto'
        }}>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              fontSize: '24px',
              color: '#fff',
              background: 'none'
            }}
          >
            &times;
          </button>
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px 24px',
                background: 'linear-gradient(90deg, #67dbcc 0%, #4ecdc4 100%)',
                color: '#0a0e19',
                fontSize: '16px',
                fontWeight: 600,
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer'
              }}
              onClick={() => { onLaunchApp(); setMobileMenuOpen(false); }}
            >
              Launch App
            </button>
            <button 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px 24px',
                background: 'linear-gradient(90deg, #74a3ff 0%, #5a8fd9 100%)',
                color: '#0a0e19',
                fontSize: '16px',
                fontWeight: 600,
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer'
              }}
              onClick={() => { onLaunchV2(); setMobileMenuOpen(false); }}
            >
              Launch V2
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .header-burger-btn { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
