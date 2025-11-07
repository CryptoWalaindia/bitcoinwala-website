// src/components/BitcoinMinaModal.tsx
import React, { useEffect } from 'react'
import { X } from 'lucide-react'

type Props = { open: boolean; onClose: () => void }

const BitcoinMinaModal: React.FC<Props> = ({ open, onClose }) => {
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
        .bitcoin-mina-modal-overlay {
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

        .bitcoin-mina-modal-content {
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

        .bitcoin-mina-modal-close-btn {
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

        .bitcoin-mina-modal-close-btn:hover {
          background-color: rgba(255, 255, 255, 0.05) !important;
        }

        .bitcoin-mina-modal-close-btn:active {
          background-color: rgba(255, 255, 255, 0.1) !important;
          transform: scale(0.95) !important;
        }
      `}</style>

      <div
        className="bitcoin-mina-modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bitcoin-mena-title"
        onMouseDown={onBackdropClick}
        onWheelCapture={(e) => e.stopPropagation()}
        onTouchMoveCapture={(e) => e.stopPropagation()}
        data-no-snap
      >
        <div
          className="bitcoin-mina-modal-content"
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
          className="bitcoin-mina-modal-close-btn"
          data-no-snap
        >
          <X className="h-5 w-5 text-[#A0A0A0]" style={{ pointerEvents: 'none' }} />
        </button>

        {/* Header */}
        <div className="px-6 sm:px-7 pt-6 pb-4 text-center border-b border-white/10">
          <h2
            id="bitcoin-mena-title"
            className="text-[21px] sm:text-[23px] font-semibold tracking-[0.22em] uppercase text-[#F97316]"
          >
            Bitcoin Mena
          </h2>
          <p className="mt-1.5 text-[13px] sm:text-[14px] text-[#A0A0A0]">
            Discover the Future
          </p>
        </div>

        {/* Body (scrollable, scrollbar hidden) */}
        <div className="px-6 sm:px-7 pt-5 pb-6 space-y-6 flex-1 overflow-y-auto no-scrollbar">
          {/* Bitcoin Mena Image */}
          <div className="flex justify-center mb-6">
            <div className="relative w-full max-w-lg">
              <img
                src="/mena abrar.jpg"
                alt="Bitcoin Mena"
                className="w-full h-48 sm:h-56 md:h-64 rounded-lg object-cover border-2 border-[#F97316]/30 shadow-lg"
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          <section>
            <div className="text-[10px] uppercase tracking-[0.08em] text-[#F97316]">00</div>
            <h3 className="mt-1 font-semibold text-[15px] text-[#F97316]">About Abrar Khan</h3>
            <p className="mt-2 leading-7 text-[#F2F2F2]/90 tracking-wider">
              I'm the Founder and CEO of BitcoinWala, a Bitcoin education and treasury initiative focused on making India a global Bitcoin leader.
              I'm also a Captain with Emirates Airline, flying the Airbus A380 for almost 12 years now, after flying with four different airlines earlier in my career.
            </p>
          </section>

          <section>
            <div className="text-[10px] uppercase tracking-[0.08em] text-[#F97316]">01</div>
            <h3 className="mt-1 font-semibold text-[15px] text-[#F97316]">Our Mission</h3>
            <p className="mt-2 leading-7 text-[#F2F2F2]/90 tracking-wider">
              Through BitcoinWala, my team and I have conducted hundreds of seminars, college sessions, and private events to educate people about Bitcoin —
              reaching over 700,000 followers across social platforms and building one of the most active Bitcoin communities in Asia.
            </p>
          </section>

          <section>
            <div className="text-[10px] uppercase tracking-[0.08em] text-[#F97316]">02</div>
            <h3 className="mt-1 font-semibold text-[15px] text-[#F97316]">Building India's Bitcoin Treasury</h3>
            <p className="mt-2 leading-7 text-[#F2F2F2]/90 tracking-wider">
              We're now working on building India's Biggest Bitcoin Treasury company, modeled after Strategy with a long-term goal to accumulate Bitcoin
              as a core reserve asset and inspire institutions to follow.
            </p>
          </section>

          <section>
            <div className="text-[10px] uppercase tracking-[0.08em] text-[#F97316]">03</div>
            <h3 className="mt-1 font-semibold text-[15px] text-[#F97316]">Global Representation</h3>
            <p className="mt-2 leading-7 text-[#F2F2F2]/90 tracking-wider">
              I represent India's growing Bitcoin movement on the global stage with one mission — to see India lead the world in Bitcoin adoption
              and financial freedom and Orange pill every Indian.
            </p>
            <div className="mt-4">
              <a
                href="https://mena.b.tc/speaker/abrar-khan---bitcoinwala"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-3 rounded-xl bg-[#F97316] hover:bg-[#ff8a2a] text-[#F2F2F2] transition font-medium"
              >
                Visit Bitcoin Mena →
              </a>
            </div>
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

export default BitcoinMinaModal
