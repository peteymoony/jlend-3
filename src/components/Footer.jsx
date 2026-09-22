export default function Footer() {
  return (
    <footer style={{
      position: 'relative',
      padding: '80px 0 40px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: 'linear-gradient(180deg, rgba(10,14,25,0) 0%, rgba(10,14,25,1) 100%)'
    }}>
      <div className="adaptive">
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '60px'
        }}>
          {/* Brand Column */}
          <div>
            <a href="#" style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <img src="/efe8a9898795c82ac1bfd14d6f8161598775b82d.svg" alt="JustLend DAO" style={{ height: '28px' }} />
            </a>
            <p style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.4)',
              lineHeight: 1.7,
              maxWidth: '280px'
            }}>
              The first official lending platform on TRON where users can borrow, lend, deposit assets and earn interests.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#fff',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>Products</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['SBM V2', 'SBM V1', 'Staked TRX', 'Energy Rental', 'Staked USDT'].map(item => (
                <li key={item}>
                  <a href="#" style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.5)',
                    transition: 'color 0.2s'
                  }} onMouseEnter={e => e.currentTarget.style.color = '#67dbcc'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#fff',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>Resources</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Documentation', 'User Guide', 'GitHub', 'Whitepaper', 'Audit Reports'].map(item => (
                <li key={item}>
                  <a href="#" style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.5)',
                    transition: 'color 0.2s'
                  }} onMouseEnter={e => e.currentTarget.style.color = '#67dbcc'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#fff',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>Community</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'X (Twitter)', icon: '\uD83D\uDC26' },
                { name: 'Telegram', icon: '\u2709' },
                { name: 'Discord', icon: '\uD83D\uDCAC' },
                { name: 'GitHub', icon: '\uD83D\uDC27' },
                { name: 'Mail', icon: '\u2709' }
              ].map(item => (
                <li key={item.name}>
                  <a href="#" style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.5)',
                    transition: 'color 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }} onMouseEnter={e => e.currentTarget.style.color = '#67dbcc'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                    <span>{item.icon}</span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SEO Content Section */}
        <div style={{
          padding: '40px 0',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          marginBottom: '40px'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '24px',
            lineHeight: 1.3
          }}>
            The JustLend Ecosystem: Decentralized Lending Redefined
          </h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            fontSize: '15px',
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.6)'
          }}>
            <p>
              At the core of our lending infrastructure is <a href="#" style={{ color: '#67dbcc', fontWeight: 500 }}>JustLend</a>, the leading decentralized lending protocol built on the Tron blockchain. We believe that capital should be fluid, transparent, and accessible to everyone, regardless of location. By leveraging the power of <a href="#" style={{ color: '#67dbcc', fontWeight: 500 }}>JustLend DAO</a>, we ensure that the platform evolves based on community governance, keeping development aligned with the needs of lenders and borrowers alike.
            </p>
            <p>
              Our <a href="#" style={{ color: '#67dbcc', fontWeight: 500 }}>JustLend exchange</a> interface is designed for simplicity without sacrificing depth. Whether you are supplying assets to earn yield or borrowing against your collateral, the experience is seamless. The <a href="#" style={{ color: '#67dbcc', fontWeight: 500 }}>JustLend org</a> team has engineered a robust system that prioritizes security and liquidity, ensuring that every transaction is executed with precision.
            </p>
            <p>
              When you engage with <a href="#" style={{ color: '#67dbcc', fontWeight: 500 }}>JustLend</a>, you are participating in a truly decentralized ecosystem. The governance model allows token holders to vote on key parameters, such as interest rate models and asset listings, ensuring the platform remains agile and community-driven. This is not just a lending protocol; it is a living, breathing financial network powered by <a href="#" style={{ color: '#67dbcc', fontWeight: 500 }}>JustLend DAO</a>.
            </p>
            <p>
              Experience the future of decentralized finance at <a href="#" style={{ color: '#67dbcc', fontWeight: 500 }}>JustLend</a>.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{
          padding: '40px 0',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          marginBottom: '40px'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '32px'
          }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              {
                q: 'What is JustLend and how does it work?',
                a: 'JustLend is a decentralized lending protocol that allows users to lend their crypto assets to earn interest or borrow against their holdings. It operates on an algorithmic model where interest rates are determined by supply and demand. You can interact with the protocol directly via our JustLend exchange interface or through compatible wallets.'
              },
              {
                q: 'What role does JustLend DAO play?',
                a: 'The JustLend DAO is the governance engine of the ecosystem. Token holders can propose and vote on changes to the protocol, including risk parameters, asset listings, and fee structures. This ensures that the platform is community-owned and transparent. The JustLend org oversees the technical implementation of these community decisions.'
              },
              {
                q: 'Is JustLend exchange secure?',
                a: 'Yes. Security is paramount. The protocol uses audited smart contracts and relies on the secure infrastructure of the Tron blockchain. The JustLend org team continuously monitors the network for vulnerabilities, and the JustLend DAO can vote to pause or adjust the protocol in case of emergencies.'
              },
              {
                q: 'How do I get started with JustLend?',
                a: 'Getting started is straightforward. Connect your Web3 wallet to the JustLend platform. You can supply assets to the lending pool to earn yield or use your crypto as collateral to borrow other assets. The JustLend exchange interface guides you through supply and borrow ratios, liquidation prices, and current interest rates in real-time.'
              },
              {
                q: 'What is the difference between JustLend org and JustLend DAO?',
                a: 'The JustLend org typically refers to the core development and operational team responsible for building and maintaining the technology. The JustLend DAO refers to the decentralized autonomous organization comprising token holders who govern the protocol\'s future through voting. They work together to ensure the protocol\'s growth and stability.'
              }
            ].map((faq, idx) => (
              <div key={idx} style={{
                padding: '24px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <span style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, rgba(103,219,204,0.2), rgba(116,163,255,0.2))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    color: '#67dbcc',
                    flexShrink: 0
                  }}>Q</span>
                  {faq.q}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.7,
                  paddingLeft: '40px'
                }}>
                  <strong style={{ color: '#74a3ff', marginRight: '8px' }}>A:</strong>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <p style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.3)'
          }}>
            &copy; {new Date().getFullYear()} JustLend DAO. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map(item => (
              <a key={item} href="#" style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.3)',
                transition: 'color 0.2s'
              }} onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
