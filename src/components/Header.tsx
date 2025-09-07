import React, { useState } from 'react'
import clsx from 'clsx'
import { Plus, X } from 'lucide-react'
import logo from '../assets/bitcoinwala-logo.png'
import BitcoinPriceTicker from './BitcoinPriceTicker'

interface HeaderProps {
  onOpenWhitepaper?: () => void
  onOpenContact?: () => void
  onOpenAbout?: () => void
  onOpenMobileMenu?: () => void
  isMobileMenuOpen?: boolean
}

const Header: React.FC<HeaderProps> = ({ onOpenWhitepaper, onOpenContact, onOpenAbout, onOpenMobileMenu, isMobileMenuOpen }) => {

  return (
    <>
      <header
        id="site-header"
        className={clsx(
          // keep header ABOVE split overlays (z-[998]) and main content
          'fixed top-0 left-0 right-0 z-[1200]',
          'h-[70px] sm:h-[80px] md:h-[90px] w-full flex items-center',
          'pt-2 sm:pt-3 md:pt-4',
          'px-2 sm:px-3 md:px-4 lg:px-6 xl:px-16',
          'transition-all duration-350 ease-in-out-custom'
        )}
      >
        {/* LEFT: Spacer for mobile (to balance the layout) */}
        <div className="sm:hidden w-10"></div>

        {/* LEFT: Desktop Navigation (hidden on mobile) */}
        <nav className="hidden sm:flex items-center gap-2 md:gap-4 lg:gap-6" role="navigation" aria-label="Primary">
          <button
            type="button"
            onClick={onOpenWhitepaper}
            aria-label="Open Whitepaper"
            className="group relative inline-flex items-center uppercase tracking-[0.2em] md:tracking-[0.25em] text-[11px] md:text-[13px] text-muted/80 transition-all duration-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-lg hover:-translate-y-0.5 active:scale-95"
          >
            <span className="absolute inset-0 -z-10 rounded-md bg-white/10 opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-105 group-hover:bg-white/15 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]" />
            <span className="px-3 py-2.5 md:px-4 md:py-3 lg:px-6 lg:py-3">WHITEPAPER</span>
          </button>

          <button
            type="button"
            onClick={onOpenContact}
            aria-label="Contact Us"
            className="group relative inline-flex items-center uppercase tracking-[0.2em] md:tracking-[0.25em] text-[11px] md:text-[13px] text-muted/80 transition-all duration-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-lg hover:-translate-y-0.5 active:scale-95"
          >
            <span className="absolute inset-0 -z-10 rounded-md bg-white/10 opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-105 group-hover:bg-white/15 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]" />
            <span className="px-3 py-2.5 md:px-4 md:py-3 lg:px-6 lg:py-3">CONTACT US</span>
          </button>
        </nav>

        {/* CENTER: Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <a href="#hero" aria-label="BitcoinWala Home" className="inline-block">
            <img
              src={logo}
              alt="BitcoinWala Logo"
              className="h-8 sm:h-10 md:h-12 lg:h-14 object-contain transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95"
            />
          </a>
        </div>

        {/* RIGHT: Bitcoin Price Ticker + Mobile Menu Button + Desktop About Us */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Bitcoin Price Ticker - Compact on mobile, full on desktop */}
          <div className="block sm:hidden">
            <BitcoinPriceTicker compact />
          </div>
          <div className="hidden sm:block">
            <BitcoinPriceTicker />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              type="button"
              onClick={onOpenMobileMenu}
              aria-label="Open Menu"
              className="group relative inline-flex items-center justify-center w-10 h-10 rounded-lg text-muted/80 transition-all duration-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 active:scale-95"
            >
              <span className="absolute inset-0 -z-10 rounded-lg bg-white/10 opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-105 group-hover:bg-white/15" />
              {isMobileMenuOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Plus className="h-7 w-7" />
              )}
            </button>
          </div>
          
          {/* Desktop About Us */}
          <nav className="hidden sm:block" role="navigation" aria-label="Secondary">
            <button
              type="button"
              onClick={onOpenAbout}
              aria-label="About Us"
              className="group relative inline-flex items-center uppercase tracking-[0.2em] md:tracking-[0.25em] text-[11px] md:text-[13px] text-muted/80 transition-all duration-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-lg hover:-translate-y-0.5 active:scale-95"
            >
              <span className="absolute inset-0 -z-10 rounded-md bg-white/10 opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-105 group-hover:bg-white/15 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]" />
              <span className="px-3 py-2.5 md:px-4 md:py-3 lg:px-6 lg:py-3">ABOUT US</span>
            </button>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header
