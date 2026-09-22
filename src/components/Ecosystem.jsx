import { useState } from 'react'

const ecoCards = [
  {
    icon: 'sbm-v2',
    title: 'SBM V2',
    desc: 'A safer isolated-collateral lending protocol that enhances security by separating collateral pools.',
    btn: 'View All Markets',
    color: '#67dbcc'
  },
  {
    icon: 'sbm-v1',
    title: 'SBM V1',
    desc: 'A cross-collateral lending protocol built for capital efficiency where you can borrow against multiple assets.',
    btn: 'View All Markets',
    btn2: 'Liquidation',
    color: '#74a3ff'
  },
  {
    icon: 'stakeTrx',
    title: 'Staked TRX',
    apy: 'APY 4.08%',
    desc: 'An enhanced staking program based on TRON Stake 2.0, offering higher yields and flexibility.',
    btn: 'Stake Now',
    color: '#67dbcc'
  },
  {
    icon: 'rentEnergy',
    title: 'Energy Rental',
    desc: 'A flexible and convenient Energy rental platform that supports renting for multiple durations.',
    btn: 'Rent Now',
    color: '#74a3ff'
  },
  {
    icon: 'stakeUsdt',
    title: 'Staked USDT',
    apy: 'APY 3.45%',
    desc: 'The first Real-World Assets (RWA) platform on TRON with a decentralized RWA investment framework.',
    btn: 'Stake Now',
    partner: true,
    color: '#67dbcc'
  },
  {
    icon: 'justCryptos',
    title: 'JUST Cryptos',
    desc: 'A bridge between the TRON network and cryptos on other quality public chains.',
    btn: 'Learn More',
    partner: true,
    color: '#74a3ff'
  },
  {
    icon: 'riskReminder',
    title: 'Risk Reminder',
    desc: 'Provide risk alerts for SBM and Energy Rental.',
    color: '#ff6b6b'
  },
  {
    icon: 'moreFunctions',
    title: 'More Functions',
    desc: 'Coming soon with more DeFi innovations.',
    color: '#ffd93d'
  }
]

export default function Ecosystem() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="growing-ecosystem" style={{
      position: 'relative',
      padding: '120px 0',
      overflow: 'hidden'
    }}>
      <div className="adaptive" style={{ position: 'relative' }}>
        {/* Section Title */}
        <div className="section-title">
          <span className="section-number">02 /</span>
          <span style={{ fontSize: '46px', fontWeight: 700, color: '#74a3ff' }}>Ecosystem</span>
          <span className="white-circle-1" />
        </div>
        <div className="title-desc">A popular and user-friendly suite of ecosystem applications</div>

        {/* Eco Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          {ecoCards.map((card, idx) => (
            <div key={idx} style={{
              background: 'rgba(19,23,33,0.8)',
              borderRadius: '24px',
              padding: '28px',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }} onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
            }} onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
            }}>
              {card.partner && (
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>Partner</div>
              )}
              
              {/* Icon */}
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: `linear-gradient(135deg, ${card.color}20, ${card.color}10)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                fontSize: '24px'
              }}>
                {card.icon === 'sbm-v2' && '\u2728'}
                {card.icon === 'sbm-v1' && '\u2699'}
                {card.icon === 'stakeTrx' && '\u26A1'}
                {card.icon === 'rentEnergy' && '\u26A1'}
                {card.icon === 'stakeUsdt' && '$'}
                {card.icon === 'justCryptos' && '\u20BF'}
                {card.icon === 'riskReminder' && '\u26A0'}
                {card.icon === 'moreFunctions' && '+'}
              </div>

              {/* Title */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '12px'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff'
                }}>{card.title}</h3>
                {card.apy && (
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: card.color,
                    background: `${card.color}20`,
                    padding: '4px 10px',
                    borderRadius: '20px'
                  }}>{card.apy}</span>
                )}
              </div>

              {/* Description */}
              <p style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.6,
                marginBottom: '20px',
                minHeight: '44px'
              }}>{card.desc}</p>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {card.btn && (
                  <span style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: card.color,
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: `1px solid ${card.color}40`,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }} onMouseEnter={e => {
                    e.currentTarget.style.background = `${card.color}20`
                  }} onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent'
                  }}>
                    {card.btn}
                  </span>
                )}
                {card.btn2 && (
                  <span style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.5)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }} onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
                  }} onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                  }}>
                    {card.btn2}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Expand/Collapse */}
        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={() => setExpanded(!expanded)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            }}
          >
            {expanded ? 'Show Less' : 'View All Ecosystem'}
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
