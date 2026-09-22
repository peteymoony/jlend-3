import { useState, useEffect } from 'react'
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import Header from './components/Header'
import Hero from './components/Hero'
import WhatsNew from './components/WhatsNew'
import Ecosystem from './components/Ecosystem'
import Footer from './components/Footer'
import ConnectWalletModal from './components/ConnectWalletModal'
import WelcomeModal from './components/WelcomeModal'
import { useWeb3Actions } from './context/Web3Actions'
import { useDisplayStore } from './context/DisplayStore'
import { tagAddress } from './config/logrocket'

function App() {
  const { connected, address } = useWallet()
  const { action } = useWeb3Actions()
  const { isLoading } = useDisplayStore()
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)
  const [hasAgreed, setHasAgreed] = useState(() => {
    return localStorage.getItem('justlend-agreed') === 'true'
  })

  useEffect(() => {
    function setFontSize() {
      let screenWidth = document.documentElement.clientWidth
      let fontSizeA
      if (screenWidth < 1920) {
        fontSizeA = (screenWidth / 1440) * 10 > 10 ? (screenWidth / 1440) * 10 : 10
      } else {
        fontSizeA = (1920 / 1440) * 10
      }
      document.querySelector('html').style.fontSize = fontSizeA + 'px'
    }
    setFontSize()
    window.addEventListener('resize', setFontSize)
    return () => window.removeEventListener('resize', setFontSize)
  }, [])

  useEffect(() => {
    if (address) tagAddress(address)
  }, [address])

  useEffect(() => {
    if (!connected) {
      setShowWelcomeModal(false)
      return
    }
    setShowWalletModal(false)
    if (!hasAgreed) {
      setShowWelcomeModal(true)
    }
  }, [connected, hasAgreed])

  const handleLaunch = () => {
    if (!connected) {
      setShowWalletModal(true)
      return
    }
    if (!hasAgreed) {
      setShowWelcomeModal(true)
      return
    }
    action()
  }

  const handleWelcomeContinue = async () => {
    setHasAgreed(true)
    localStorage.setItem('justlend-agreed', 'true')
    await action()
    setShowWelcomeModal(false)
  }

  return (
    <>
      <div className="fallback-bg"></div>
      <div className="main">
        <div className="homepage">
          <Header onLaunchApp={handleLaunch} onLaunchV2={handleLaunch} />
          <Hero onLaunchV2={handleLaunch} />
          <WhatsNew />
          <Ecosystem />
          <Footer />
        </div>
      </div>

      {showWalletModal && !connected && (
        <ConnectWalletModal onClose={() => setShowWalletModal(false)} />
      )}

      {showWelcomeModal && connected && (
        <WelcomeModal
          onClose={() => setShowWelcomeModal(false)}
          onContinue={handleWelcomeContinue}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

export default App
