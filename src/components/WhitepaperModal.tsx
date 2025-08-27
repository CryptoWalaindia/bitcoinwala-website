// src/components/WhitepaperModal.tsx
import React, { useEffect } from 'react'
import { X } from 'lucide-react'
// Import PDF as static asset to ensure it's included in build
import whitepaperPdf from '/whitepaper.pdf?url'

type Props = { open: boolean; onClose: () => void }

const WhitepaperModal: React.FC<Props> = ({ open, onClose }) => {
  // Use imported PDF URL with fallback
  const PDF_URL = whitepaperPdf || `${import.meta.env.BASE_URL}whitepaper.pdf`

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
        .whitepaper-modal-overlay {
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
        
        .whitepaper-modal-content {
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
        
        .whitepaper-modal-close-btn {
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
        
        .whitepaper-modal-close-btn:hover {
          background-color: rgba(255, 255, 255, 0.05) !important;
        }
        
        .whitepaper-modal-close-btn:active {
          background-color: rgba(255, 255, 255, 0.1) !important;
          transform: scale(0.95) !important;
        }
      `}</style>
      
      <div
        className="whitepaper-modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="whitepaper-title"
        onMouseDown={onBackdropClick}
        onWheelCapture={(e) => e.stopPropagation()}
        onTouchMoveCapture={(e) => e.stopPropagation()}
        data-no-snap
      >
        <div
          className="whitepaper-modal-content"
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
          className="whitepaper-modal-close-btn"
          data-no-snap
        >
          <X className="h-5 w-5 text-[#A0A0A0]" style={{ pointerEvents: 'none' }} />
        </button>

        {/* Header */}
        <div className="px-6 sm:px-7 pt-6 pb-4 text-center border-b border-white/10">
          <h2
            id="whitepaper-title"
            className="text-[21px] sm:text-[23px] font-semibold tracking-[0.22em] uppercase text-[#F97316]"
          >
            Whitepaper
          </h2>
          <p className="mt-1.5 text-[13px] sm:text-[14px] text-[#A0A0A0]">
            India’s first Bitcoin Treasury
          </p>
        </div>

        {/* Body (scrollable, scrollbar hidden) */}
        <div className="px-6 sm:px-7 pt-5 pb-6 space-y-6 flex-1 overflow-y-auto no-scrollbar">
          <section>
            <div className="text-[10px] uppercase tracking-[0.08em] text-[#F97316]">00</div>
            <h3 className="mt-1 font-semibold text-[15px] text-[#F97316]">Abstract</h3>
            <p className="mt-2 leading-7 text-[#F2F2F2]/90 tracking-wider">
              India’s first publicly listed Bitcoin treasury company. Our mandate is singular.
              Acquire Bitcoin and hold it as the primary reserve asset on our balance sheet.
            </p>
          </section>

          <section>
            <div className="text-[10px] uppercase tracking-[0.08em] text-[#F97316]">01</div>
            <h3 className="mt-1 font-semibold text-[15px] text-[#F97316]">Mission</h3>
            <p className="mt-2 leading-7 text-[#F2F2F2]/90 tracking-wider">
              Hold 1,000,000 Bitcoin within five years. Every sat is publicly accounted,
              verifiable and audited.
            </p>
          </section>

          <section>
            <div className="text-[10px] uppercase tracking-[0.08em] text-[#F97316]">02</div>
            <h3 className="mt-1 font-semibold text-[15px] text-[#F97316]">Structure</h3>
            <p className="mt-2 leading-7 text-[#F2F2F2]/90 tracking-wider">
              Buy Bitcoin. Hold it on our balance sheet. Never sell. We use no leverage, no lending,
              no rehypothecation, and no altcoin exposure. Operating liquidity comes from equity or
              debt at the holding company, not from selling Bitcoin.
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
          <a
            href={PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-[#F97316] hover:bg-[#ff8a2a] text-[#F2F2F2] transition"
            data-no-snap
          >
            View PDF
          </a>
          {/* If you also want a direct download:
          <a href={PDF_URL} download className="px-4 py-2 rounded-xl border border-[#1A1A1A]">Download</a> */}
        </div>
        </div>
      </div>
    </>
  )
}

export default WhitepaperModal
