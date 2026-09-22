export default function WhatsNew() {
  return (
    <div style={{
      position: 'relative',
      padding: '120px 0',
      color: '#fff'
    }}>
      <div className="adaptive" style={{ position: 'relative' }}>
        {/* Section Title */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '16px'
        }}>
          <span style={{
            fontSize: '14px',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.5)',
            fontFamily: "'Inter', monospace",
            marginTop: '8px'
          }}>01 /</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.1
            }}>What's</span>
            <span style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 700,
              color: '#74a3ff',
              lineHeight: 1.1
            }}>New</span>
            {/* Decorative sparkle circle */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ marginTop: '4px' }}>
              <circle cx="16" cy="16" r="14" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="2 2"/>
              <circle cx="16" cy="16" r="8" stroke="rgba(116,163,255,0.5)" strokeWidth="1"/>
              <circle cx="16" cy="16" r="3" fill="rgba(116,163,255,0.3)"/>
            </svg>
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          fontSize: '18px',
          color: 'rgba(255,255,255,0.5)',
          marginBottom: '60px'
        }}>SBM V2 is now live</div>

        {/* Content Cards */}
        <div style={{
          display: 'flex',
          gap: '24px',
          marginTop: '40px',
          flexWrap: 'wrap'
        }}>
          {/* SBM V2 Card */}
          <div style={{
            flex: 1,
            minWidth: '300px',
            position: 'relative',
            padding: '32px',
            backgroundColor: 'rgba(19,23,33,0.6)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.06)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            overflow: 'hidden'
          }}>
            {/* Decorative gradient */}
            <div style={{
              position: 'absolute',
              top: '-30%',
              right: '-20%',
              width: '250px',
              height: '250px',
              background: 'radial-gradient(circle, rgba(116,163,255,0.12) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h4 style={{
                fontSize: '24px',
                fontWeight: 700,
                marginBottom: '16px',
                color: '#fff'
              }}>SBM V2 &#10024;</h4>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.7,
                marginBottom: '20px'
              }}>
                As a safer lending protocol, SBM V2 features the following characteristics:
              </p>
              <ul style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '32px'
              }}>
                {[
                  'Isolated-collateral lending lowers liquidation risks from token volatility.',
                  'Self-adaptive interest models adjust APYs in real-time based on market utilization.',
                  'More Alpha assets are supported, offering diversified market options.'
                ].map((item, idx) => (
                  <li key={idx} style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.65)',
                    lineHeight: 1.6,
                    paddingLeft: '20px',
                    position: 'relative'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      top: '8px',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#67dbcc'
                    }} />
                    {item}
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#67dbcc',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: '1px solid rgba(103,219,204,0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }} onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(103,219,204,0.1)'
                }} onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                }}>
                  Explore V2
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
                <a href="#" style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.5)',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'color 0.2s'
                }} onMouseEnter={e => e.currentTarget.style.color = '#67dbcc'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                >
                  Documentation
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* SBM V1 Card */}
          <div style={{
            flex: 1,
            minWidth: '300px',
            position: 'relative',
            padding: '32px',
            backgroundColor: 'rgba(19,23,33,0.6)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.06)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            overflow: 'hidden'
          }}>
            {/* Decorative gradient */}
            <div style={{
              position: 'absolute',
              top: '-30%',
              right: '-20%',
              width: '250px',
              height: '250px',
              background: 'radial-gradient(circle, rgba(103,219,204,0.12) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h4 style={{
                fontSize: '24px',
                fontWeight: 700,
                marginBottom: '16px',
                color: '#fff'
              }}>SBM V1</h4>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.7,
                marginBottom: '20px'
              }}>
                As a high capital efficiency lending protocol, SBM V1 features the following characteristics:
              </p>
              <ul style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '32px'
              }}>
                {[
                  'Cross-collateral lending enhances capital utilization.',
                  'Customizable fixed APY models allow market-specific parameters.',
                  'More mainstream assets are provided, ensuring higher market reliability.'
                ].map((item, idx) => (
                  <li key={idx} style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.65)',
                    lineHeight: 1.6,
                    paddingLeft: '20px',
                    position: 'relative'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      top: '8px',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#74a3ff'
                    }} />
                    {item}
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#74a3ff',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: '1px solid rgba(116,163,255,0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }} onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(116,163,255,0.1)'
                }} onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                }}>
                  Explore V1
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
                <a href="#" style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.5)',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'color 0.2s'
                }} onMouseEnter={e => e.currentTarget.style.color = '#74a3ff'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                >
                  Documentation
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
