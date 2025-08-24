import React from 'react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onOpenWhitepaper?: () => void
  onOpenContact?: () => void
  onOpenAbout?: () => void
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  onClose, 
  onOpenWhitepaper, 
  onOpenContact, 
  onOpenAbout 
}) => {
  const handleMenuAction = (action: () => void) => {
    action()
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <style>{`
        .mobile-menu-overlay {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          z-index: 99999 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          background-color: rgba(0, 0, 0, 0.8) !important;
          backdrop-filter: blur(4px) !important;
        }
        
        .mobile-menu-content {
          position: relative !important;
          background-color: rgba(11, 11, 11, 0.95) !important;
          border: 1px solid rgba(26, 26, 26, 1) !important;
          border-radius: 16px !important;
          margin: 0 24px !important;
          width: 100% !important;
          max-width: 384px !important;
          backdrop-filter: blur(12px) !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
        }
        
        .mobile-menu-nav {
          display: flex !important;
          flex-direction: column !important;
          padding: 32px !important;
          gap: 24px !important;
        }
        
        .mobile-menu-button {
          padding: 20px 32px !important;
          border-radius: 12px !important;
          color: rgba(255, 255, 255, 0.7) !important;
          transition: all 0.2s ease !important;
          font-size: 18px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.2em !important;
          font-weight: 500 !important;
          background: transparent !important;
          border: none !important;
          cursor: pointer !important;
        }
        
        .mobile-menu-button:hover {
          color: white !important;
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
        
        .mobile-menu-button:active {
          transform: scale(0.95) !important;
        }
        
        @media (min-width: 640px) {
          .mobile-menu-overlay {
            display: none !important;
          }
        }
      `}</style>
      
      <div className="mobile-menu-overlay">
        {/* Backdrop - click to close */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            cursor: 'pointer'
          }}
          onClick={onClose}
        />
        
        {/* Menu Content */}
        <div className="mobile-menu-content">
          <nav className="mobile-menu-nav">
            <button
              type="button"
              onClick={() => handleMenuAction(onOpenWhitepaper || (() => {}))}
              className="mobile-menu-button"
            >
              WHITEPAPER
            </button>
            
            <button
              type="button"
              onClick={() => handleMenuAction(onOpenContact || (() => {}))}
              className="mobile-menu-button"
            >
              CONTACT US
            </button>
            
            <button
              type="button"
              onClick={() => handleMenuAction(onOpenAbout || (() => {}))}
              className="mobile-menu-button"
            >
              ABOUT US
            </button>
          </nav>
        </div>
      </div>
    </>
  )
}

export default MobileMenu