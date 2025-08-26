// src/components/ContactModal.tsx
import React, { useEffect, useRef, useState } from 'react'
import { X, ArrowRight } from 'lucide-react'
import clsx from 'clsx'

interface ContactModalProps {
  open: boolean
  onClose: () => void
}

type AudienceType = 'individual' | 'company'

const ContactModal: React.FC<ContactModalProps> = ({ open, onClose }) => {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const firstInputRef = useRef<HTMLInputElement | null>(null)
  const [audience, setAudience] = useState<AudienceType>('individual')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Close on ESC
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Autofocus + reset when closing
  useEffect(() => {
    if (open) {
      setTimeout(() => firstInputRef.current?.focus(), 10)
    } else {
      setSubmitted(false)
      setIsSubmitting(false)
      setAudience('individual')
    }
  }, [open])

  // Simple submit handler (replace with webhook later)
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Add delay before showing thank you message
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1500) // 1.5 second delay
    
    // TODO: send to webhook / email here
  }

  if (!open) return null

  return (
    <>
      <style>{`
        .contact-modal-overlay {
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
        
        .contact-modal-content {
          position: relative !important;
          z-index: 99999 !important;
          width: 92vw !important;
          max-width: 520px !important;
          border-radius: 24px !important;
          border: 1px solid #1A1A1A !important;
          padding: 28px 32px !important;
          box-shadow: 0 20px 80px rgba(0,0,0,0.55) !important;
          background: linear-gradient(180deg, #2a2a2a 0%, #121212 100%) !important;
          color: #F2F2F2 !important;
        }
        
        .contact-modal-close-btn {
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
        
        .contact-modal-close-btn:hover {
          background-color: rgba(255, 255, 255, 0.05) !important;
        }
        
        .contact-modal-close-btn:active {
          background-color: rgba(255, 255, 255, 0.1) !important;
          transform: scale(0.95) !important;
        }
        
        @media (max-width: 640px) {
          .contact-modal-content {
            padding: 24px !important;
          }
        }
      `}</style>
      
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        className="contact-modal-overlay"
        data-no-snap
        onWheelCapture={(e) => e.stopPropagation()}
        onTouchMoveCapture={(e) => e.stopPropagation()}
        onMouseDown={(e) => {
          // backdrop close (click outside the card)
          const target = e.target as HTMLElement
          if (target === e.currentTarget) onClose()
        }}
      >
        {/* Card */}
        <div
          ref={dialogRef}
          className="contact-modal-content"
          onClick={(e) => e.stopPropagation()}
          data-no-snap
        >
        {/* Brand pill */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="px-3 py-1 rounded-full text-[11px] tracking-wide bg-black/80 border border-[#1A1A1A]">
            BitcoinWala
          </span>
        </div>

        {/* Close */}
        <button
          aria-label="Close"
          className="contact-modal-close-btn"
          onClick={onClose}
          data-no-snap
        >
          <X className="h-5 w-5 text-[#A0A0A0]" style={{ pointerEvents: 'none' }} />
        </button>

        {/* Title */}
        <div className="mb-7 text-center">
          <h2
            id="contact-title"
            className="text-[22px] sm:text-[24px] font-semibold tracking-[0.22em] uppercase text-[#F97316]"
          >
            Join
          </h2>
          <p className="text-[18px] sm:text-[20px] font-medium tracking-[0.18em] uppercase text-[#F97316] mt-1">
            The New Standard
          </p>
        </div>

        {/* Success state */}
        {submitted ? (
          <div className="text-center space-y-4">
            <p className="text-sm text-[#A0A0A0]">
              Thanks! We’ve received your details. Our team will reach out shortly.
            </p>
            <button
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium bg-[#F97316] hover:bg-[#ff8a2a] transition"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : isSubmitting ? (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F97316]"></div>
            </div>
            <p className="text-sm text-[#A0A0A0]">
              Processing your request...
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Segmented audience toggle */}
            <div role="radiogroup" aria-label="Audience type" className="grid grid-cols-2 gap-3">
              {(['individual', 'company'] as AudienceType[]).map((opt) => {
                const selected = audience === opt
                return (
                  <label
                    key={opt}
                    className={clsx(
                      'cursor-pointer select-none rounded-xl px-4 py-3 text-sm text-center uppercase tracking-wide',
                      'border',
                      selected
                        ? 'border-white/30 bg-white/10'
                        : 'border-[#1A1A1A] bg-black/20 hover:bg-white/5'
                    )}
                  >
                    <input
                      type="radio"
                      name="audience"
                      value={opt}
                      className="sr-only"
                      checked={selected}
                      onChange={() => setAudience(opt)}
                    />
                    <span className="inline-flex items-center justify-center gap-2">
                      <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#A0A0A0]">
                        {selected && <span className="h-2.5 w-2.5 rounded-full bg-[#F2F2F2]" />}
                      </span>
                      {opt === 'individual' ? 'Individual' : 'Company'}
                    </span>
                  </label>
                )
              })}
            </div>

            {/* Names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  ref={firstInputRef}
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  className="w-full rounded-xl border border-[#1A1A1A] bg-black/25 px-4 py-3 text-sm placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                  className="w-full rounded-xl border border-[#1A1A1A] bg-black/25 px-4 py-3 text-sm placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full rounded-xl border border-[#1A1A1A] bg-black/25 px-4 py-3 text-sm placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                inputMode="tel"
                pattern="^[0-9+\\-\\s()]{6,}$"
                title="Use digits, spaces, +, -, or ()"
                required
                className="w-full rounded-xl border border-[#1A1A1A] bg-black/25 px-4 py-3 text-sm placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>

            {/* CTA */}
            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F97316] px-5 py-3 text-sm font-semibold uppercase tracking-wide transition hover:bg-[#ff8a2a] focus-visible:outline-none"
            >
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}
        </div>
      </div>
    </>
  )
}

export default ContactModal
