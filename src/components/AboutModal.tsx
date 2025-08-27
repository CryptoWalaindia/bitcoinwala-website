// src/components/AboutModal.tsx
import React, { useEffect } from 'react'
import { X } from 'lucide-react'

type Props = { open: boolean; onClose: () => void }

const AboutModal: React.FC<Props> = ({ open, onClose }) => {
  // ESC to close
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const onBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <>
      <style>{`
        .about-modal-overlay {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          z-index: 99998 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 16px !important;
          background-color: rgba(0, 0, 0, 0.6) !important;
          backdrop-filter: blur(4px) !important;
          overflow-y: auto !important;
          overscroll-behavior: contain !important;
        }
        
        .about-modal-content {
          position: relative !important;
          z-index: 99999 !important;
          width: 92vw !important;
          max-width: 520px !important;
          max-height: 78vh !important;
          border-radius: 24px !important;
          border: 1px solid #1A1A1A !important;
          box-shadow: 0 20px 80px rgba(0,0,0,0.55) !important;
          background: linear-gradient(180deg, #2a2a2a 0%, #121212 100%) !important;
          color: #F2F2F2 !important;
          user-select: none !important;
          display: flex !important;
          flex-direction: column !important;
        }
        
        .about-modal-close-btn {
          position: absolute !important;
          right: 14px !important;
          top: 14px !important;
          z-index: 100000 !important;
          display: inline-flex !important;
          height: 36px !important;
          width: 36px !important;
          align-items: center !important;
          justify-content: center !important;
          border-radius: 8px !important;
          border: 1px solid #1A1A1A !important;
          background: transparent !important;
          cursor: pointer !important;
          transition: background-color 0.2s ease !important;
          touch-action: manipulation !important;
          -webkit-tap-highlight-color: transparent !important;
        }
        
        .about-modal-close-btn:hover {
          background-color: rgba(255, 255, 255, 0.05) !important;
        }
        
        .about-modal-close-btn:active {
          background-color: rgba(255, 255, 255, 0.1) !important;
          transform: scale(0.95) !important;
        }
      `}</style>
      
      <div
        className="about-modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-title"
        onMouseDown={onBackdropClick}
        onWheelCapture={(e) => e.stopPropagation()}
        onTouchMoveCapture={(e) => e.stopPropagation()}
        data-no-snap
      >
        <div
          className="about-modal-content"
          onClick={(e) => e.stopPropagation()}
          data-no-snap
        >
        {/* Brand pill */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="px-3 py-1 rounded-full text-[11px] tracking-wider bg-black/80 border border-[#1A1A1A]">
            BitcoinWala
          </span>
        </div>

        {/* Close */}
        <button
          aria-label="Close"
          onClick={onClose}
          className="about-modal-close-btn"
          data-no-snap
        >
          <X className="h-5 w-5 text-[#A0A0A0]" style={{ pointerEvents: 'none' }} />
        </button>

        {/* Header */}
        <div className="px-6 sm:px-7 pt-6 pb-4 text-center border-b border-white/10">
          <h2
            id="about-title"
            className="text-[21px] sm:text-[23px] font-semibold tracking-[0.22em] uppercase text-[#F97316]"
          >
            About Us
          </h2>
          <p className="mt-1.5 text-[13px] sm:text-[14px] text-[#A0A0A0]">
           Indias 1st Publically listed Bitcoin Treasury. 
          </p>
        </div>

        {/* Body (scrollable, scrollbar hidden) */}
        <div className="px-6 sm:px-7 pt-5 pb-6 space-y-6 flex-1 overflow-y-auto no-scrollbar">
          <section>
            <div className="text-[10px] uppercase tracking-[0.08em] text-[#F97316]">00</div>
            <h3 className="mt-1 font-semibold text-[15px] text-[#F97316]">Our Foundation</h3>
            <p className="mt-2 leading-7 text-[#F2F2F2]/90 tracking-wider">
              We believe Bitcoin is not just money — it is the foundation of a new financial era.
              Founded by Abrar Khan, an Emirates A380 Captain turned Bitcoin entrepreneur, BitcoinWala is built on a singular vision:
              to make India a global hub for Bitcoin adoption, education, and financial innovation.
            </p>
          </section>

          <section>
            <div className="text-[10px] uppercase tracking-[0.08em] text-[#F97316]">01</div>
            <h3 className="mt-1 font-semibold text-[15px] text-[#F97316]">Our Journey</h3>
            <p className="mt-2 leading-7 text-[#F2F2F2]/90 tracking-wider">
              Abrar has been in the crypto space actively since 2015, witnessing first-hand the rise, challenges, and unstoppable growth of Bitcoin. 
              Flying across the world as an A380 Captain gave him a global perspective on how nations, institutions, and people view money. 
              But his mission remains rooted in India — to give every individual, from students to institutions, a direct pathway to Bitcoin.
            </p>
          </section>

          <section>
            <div className="text-[10px] uppercase tracking-[0.08em] text-[#F97316]">02</div>
            <h3 className="mt-1 font-semibold text-[15px] text-[#F97316]">Our Movement</h3>
            <p className="mt-2 leading-7 text-[#F2F2F2]/90 tracking-wider">
              BitcoinWala is more than a company. It is a movement.
              We are building India's first publicly listed Bitcoin treasury, creating the simplest and safest way for Indians to gain Bitcoin exposure — 
              without wallets, without complexity, and with full transparency.
            </p>
          </section>

          <section>
            <div className="text-[10px] uppercase tracking-[0.08em] text-[#F97316]">03</div>
            <h3 className="mt-1 font-semibold text-[15px] text-[#F97316]">Our Strategy</h3>
            <p className="mt-2 leading-7 text-[#F2F2F2]/90 tracking-wider">
              Our strategy is simple: Buy. Hold. Never Sell.
              With institutional-grade governance, proof of reserves, and radical transparency, we aim to hold 1 million by 2035, 
              making BitcoinWala India's largest Bitcoin reserve.
            </p>
          </section>

          <section>
            <div className="text-[10px] uppercase tracking-[0.08em] text-[#F97316]">04</div>
            <h3 className="mt-1 font-semibold text-[15px] text-[#F97316]">Our Mission</h3>
            <p className="mt-2 leading-7 text-[#F2F2F2]/90 tracking-wider">
              This is not just about investment. It's about financial sovereignty, freedom, and building the future of money.
              Welcome to BitcoinWala. Welcome to the future.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-7 pb-5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#1A1A1A] text-[#A0A0A0] hover:bg-white/5 transition"
            data-no-snap
          >
            Close
          </button>
        </div>
        </div>
      </div>
    </>
  )
}

export default AboutModal