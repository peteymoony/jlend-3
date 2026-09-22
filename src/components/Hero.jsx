import { useEffect, useRef } from 'react'

export default function Hero({ onLaunchV2 }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingTop: '100px',
      paddingBottom: '60px',
      overflow: 'hidden'
    }}>
      {/* Video Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        overflow: 'hidden'
      }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.8
          }}
        >
          <source src="/portalTopBg-BXRT7Oah.webm" type="video/webm" />
        </video>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(10,14,25,0.1) 0%, rgba(10,14,25,0.4) 40%, rgba(10,14,25,0.9) 100%)'
        }} />
      </div>

      {/* Main Hero Content */}
      <div className="adaptive" style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 40px',
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        paddingTop: '80px',
        paddingBottom: '40px'
      }}>
        {/* Left Content */}
        <div style={{
          flex: 1,
          maxWidth: '680px',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Banner Title */}
          <h1 style={{
            fontSize: 'clamp(56px, 8vw, 104px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            marginBottom: '40px',
            color: '#ffffff',
            textAlign: 'left',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
          }}>
            JUSTLEND DAO
          </h1>

          {/* Banner Desc */}
          <p style={{
            fontSize: 'clamp(16px, 1.3vw, 20px)',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.7,
            marginBottom: '28px',
            maxWidth: '580px',
            textAlign: 'left',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400
          }}>
            JustLend DAO, an ever-growing decentralized ecosystem where users can supply assets to earn yields, borrow assets against collateral, stake TRX, rent Energy, and explore a myriad of popular DeFi applications.
          </p>

          {/* Sub text */}
          <p style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '48px',
            textAlign: 'left',
            fontFamily: "'Inter', sans-serif"
          }}>
            Safer lending &amp; more markets: all in SBM V2 ✨
          </p>

          {/* Just Launch V2 Button */}
          <button 
            onClick={onLaunchV2}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 28px',
              background: 'linear-gradient(90deg, #67dbcc 0%, #4ecdc4 100%)',
              color: '#0a0e19',
              fontSize: '16px',
              fontWeight: 600,
              borderRadius: '14px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: "'Inter', sans-serif"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(103,219,204,0.35)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Just Launch V2
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </button>
        </div>

        {/* Right - 3D Graphics Area */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          minHeight: '450px'
        }}>
          <div style={{
            width: '450px',
            height: '450px',
            position: 'relative'
          }}>
            {/* Glow effects */}
            <div style={{
              position: 'absolute',
              top: '5%',
              right: '15%',
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(103,219,204,0.35) 0%, transparent 70%)',
              filter: 'blur(25px)'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '15%',
              left: '15%',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(116,163,255,0.25) 0%, transparent 70%)',
              filter: 'blur(35px)'
            }} />
            
            {/* Main orb */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '220px',
              height: '220px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(103,219,204,0.15), rgba(116,163,255,0.15))',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 80px rgba(103,219,204,0.1)'
            }}>
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="42" stroke="rgba(103,219,204,0.25)" strokeWidth="0.8"/>
                <circle cx="50" cy="50" r="28" stroke="rgba(116,163,255,0.2)" strokeWidth="0.8"/>
                <circle cx="50" cy="50" r="14" fill="url(#heroGrad)" fillOpacity="0.25"/>
                <defs>
                  <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#67dbcc" />
                    <stop offset="100%" stopColor="#74a3ff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Floating coins */}
            <div style={{
              position: 'absolute',
              top: '10%',
              right: '20%',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(145deg, rgba(103,219,204,0.7), rgba(103,219,204,0.2))',
              border: '1px solid rgba(103,219,204,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              color: '#fff',
              animation: 'float1 6s ease-in-out infinite',
              boxShadow: '0 4px 20px rgba(103,219,204,0.2)'
            }}>₿</div>
            
            <div style={{
              position: 'absolute',
              bottom: '20%',
              right: '10%',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(145deg, rgba(116,163,255,0.7), rgba(116,163,255,0.2))',
              border: '1px solid rgba(116,163,255,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              color: '#fff',
              animation: 'float2 5s ease-in-out infinite 1s',
              boxShadow: '0 4px 20px rgba(116,163,255,0.2)'
            }}>Ξ</div>
            
            <div style={{
              position: 'absolute',
              top: '35%',
              right: '2%',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'linear-gradient(145deg, rgba(255,217,61,0.7), rgba(255,217,61,0.2))',
              border: '1px solid rgba(255,217,61,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              color: '#fff',
              animation: 'float3 7s ease-in-out infinite 0.5s',
              boxShadow: '0 4px 20px rgba(255,217,61,0.15)'
            }}>$</div>

            <div style={{
              position: 'absolute',
              bottom: '35%',
              left: '5%',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'linear-gradient(145deg, rgba(103,219,204,0.5), rgba(116,163,255,0.3))',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              color: '#fff',
              animation: 'float1 8s ease-in-out infinite 2s'
            }}>◎</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="adaptive" style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 40px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px'
        }}>
          <StatCard 
            icon={<TvlIcon />}
            label="TVL"
            value="$ 7,209,216,844"
          />
          <StatCard 
            icon={<GrantsIcon />}
            label="Grants Power"
            value="$ 239,832,696"
            extra={<div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px' }}>
              <span style={{ fontSize: '14px' }}>🔔</span>
              <span style={{ color: '#67dbcc', fontWeight: 600, fontSize: '13px' }}>$90M+ Buyback Underway</span>
            </div>}
          />
          <StatCard 
            icon={<UsersIcon />}
            label="Ecosystem Users"
            value="485,498"
          />
          <StatCard 
            icon={<ApyIcon />}
            label="JST in SBM"
            value="Enjoy up to 0.30% APY"
            isLink
          />
        </div>
      </div>

      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(3deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(-3deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @media (max-width: 1024px) {
          .adaptive > div:first-of-type { flex-direction: column !important; padding-top: 40px !important; }
          .adaptive > div:first-of-type > div:last-child { display: none !important; }
        }
        @media (max-width: 768px) {
          .adaptive > div:last-child > div { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}

function StatCard({ icon, label, value, extra, isLink }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '24px',
      border: '1px solid rgba(255,255,255,0.06)',
      transition: 'all 0.3s ease',
      cursor: isLink ? 'pointer' : 'default'
    }} onMouseEnter={e => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
    }} onMouseLeave={e => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        <span style={{
          fontSize: '13px',
          color: 'rgba(255,255,255,0.45)',
          fontWeight: 500
        }}>{label}</span>
        <div style={{
          width: '22px',
          height: '22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon}
        </div>
      </div>
      <div style={{
        fontSize: 'clamp(18px, 1.8vw, 26px)',
        fontWeight: 700,
        color: '#fff',
        lineHeight: 1.2,
        letterSpacing: '-0.01em'
      }}>
        {value}
      </div>
      {extra}
    </div>
  )
}

function TvlIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}

function GrantsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function ApyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )
}
