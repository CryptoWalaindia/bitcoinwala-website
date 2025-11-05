import React, { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import Header from './components/Header'
import JoinUsBar from './components/JoinUsBar'
import HeroSection from './components/HeroSection'
import CountdownSection from './components/CountdownSection'
import Footer from './components/Footer'
import WhitepaperModal from './components/WhitepaperModal'
import ContactModal from './components/ContactModal'
import AboutModal from './components/AboutModal'
import MobileMenu from './components/MobileMenu'
import BitcoinPriceTicker from './components/BitcoinPriceTicker'



function App() {
  const [isJoinUsBarVisible, setIsJoinUsBarVisible] = React.useState(false)
  const [whitepaperOpen, setWhitepaperOpen] = React.useState(false)
  const [contactOpen, setContactOpen] = React.useState(false)
  const [aboutOpen, setAboutOpen] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(0)

  const lenisRef = useRef<Lenis | null>(null)
  const isAnimatingRef = useRef(false)
  const modalOpenRef = useRef(false)
  const pageIndexRef = useRef(0)
  const lastTriggerAtRef = useRef(0)

  useEffect(() => { modalOpenRef.current = whitepaperOpen || contactOpen || aboutOpen || mobileMenuOpen }, [whitepaperOpen, contactOpen, aboutOpen, mobileMenuOpen])

  // ---------- helpers ----------
  const getHeaderOffset = () => {
    const header = document.getElementById('site-header')
    if (!header) {
      // Fallback based on screen size
      if (window.innerWidth < 640) return 70  // sm breakpoint
      if (window.innerWidth < 768) return 80  // md breakpoint
      return 90
    }
    return Math.max(0, Math.ceil(header.getBoundingClientRect().bottom))
  }

  const sectionsRef = useRef<HTMLElement[] | null>(null)
  const findSections = () => {
    if (!sectionsRef.current) {
      sectionsRef.current = Array.from(document.querySelectorAll<HTMLElement>('section[data-snap]'))
    }
    return sectionsRef.current
  }

  const targetTopForIndex = (idx: number) => {
    const sections = findSections()
    const i = Math.max(0, Math.min(sections.length - 1, idx))
    const el = sections[i]
    const rect = el.getBoundingClientRect()
    const absoluteTop = rect.top + window.scrollY

    if (i === sections.length - 1) {
      const sectionBottom = absoluteTop + rect.height
      return Math.max(0, Math.round(sectionBottom - window.innerHeight))
    }
    return Math.max(0, Math.round(absoluteTop - getHeaderOffset()))
  }

  const goToIndex = (idx: number, durationSec = 1.0) => {
    if (!lenisRef.current) return
    if (isAnimatingRef.current) return

    isAnimatingRef.current = true
    pageIndexRef.current = idx
    setCurrentPage(idx)

    const SPLIT_MS = 360
    const target = targetTopForIndex(idx)

    lenisRef.current.stop()
    document.body.classList.add('split-in')

    lenisRef.current.scrollTo(target, {
      duration: durationSec,
      easing: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    })

    const deadline = performance.now() + 700  // Wait max 0.7 seconds instead of 1.8 seconds
    const settle = () => {
      const diff = Math.abs(window.scrollY - target)
      if (diff <= 1 || performance.now() > deadline) {
        window.scrollTo({ top: target, left: 0, behavior: 'auto' })
        document.body.classList.remove('split-in')
        document.body.classList.add('split-out')
        setTimeout(() => {
          document.body.classList.remove('split-out')
          isAnimatingRef.current = false
          lastTriggerAtRef.current = performance.now()
          lenisRef.current?.start()
        }, SPLIT_MS)
        return
      }
      requestAnimationFrame(settle)
    }
    settle()
  }

  // ---------- a11y helpers ----------
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Tab') document.body.classList.add('user-is-tabbing') }
    const onMouseDown = () => document.body.classList.remove('user-is-tabbing')
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('mousedown', onMouseDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('mousedown', onMouseDown)
    }
  }, [])

  // ---------- Lenis ----------
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      smoothWheel: true,
      smoothTouch: false,
      lerp: 0.1,
      wheelMultiplier: 1.0,
    })
    lenisRef.current = lenis
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  // Pause background scroll when any modal is open
  useEffect(() => {
    const anyOpen = whitepaperOpen || contactOpen || aboutOpen || mobileMenuOpen
    if (anyOpen) { document.body.classList.add('modal-open'); lenisRef.current?.stop() }
    else { document.body.classList.remove('modal-open'); lenisRef.current?.start() }
  }, [whitepaperOpen, contactOpen, aboutOpen, mobileMenuOpen])

  // ---------- STRICT 2-PAGE PAGER ----------
  useEffect(() => {
    const COOLDOWN_MS = 350
    const EPS = 12

    const atPos = (idx: number) =>
      Math.abs(window.scrollY - targetTopForIndex(idx)) <= EPS

    const trigger = (dir: 1 | -1) => {
      const now = performance.now()
      if (now - lastTriggerAtRef.current < COOLDOWN_MS) return
      const current = pageIndexRef.current
      const sections = findSections()
      const lastIdx = sections.length - 1
      const next = Math.max(0, Math.min(lastIdx, current + dir))
      if (next !== current) goToIndex(next, 1.0)
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (modalOpenRef.current || isAnimatingRef.current || !lenisRef.current) return
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      if (delta === 0) return
      const sign = Math.sign(delta) as 1 | -1
      const current = pageIndexRef.current
      if (current === 0 && atPos(0) && sign > 0) return trigger(1)
      if (current === 1 && atPos(1) && sign < 0) return trigger(-1)
      if (sign > 0) trigger(1); else trigger(-1)
    }

    const onKey = (e: KeyboardEvent) => {
      if (modalOpenRef.current || isAnimatingRef.current) return
      const ae = document.activeElement as HTMLElement | null
      const isTyping = ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA' || (ae as any).isContentEditable)
      if (isTyping) return

      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); trigger(1) }
      else if (['ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); trigger(-1) }
      else if (e.key === 'Home') { e.preventDefault(); if (!atPos(0)) goToIndex(0, 1.0) }
      else if (e.key === 'End') { e.preventDefault(); if (!atPos(1)) goToIndex(1, 1.0) }
    }

    let startY = 0
    let tracking = false
    const onTouchStart = (e: TouchEvent) => {
      if (modalOpenRef.current || isAnimatingRef.current) return
      if (e.touches.length !== 1) return
      startY = e.touches[0].clientY
      tracking = true
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!tracking) return
      e.preventDefault()
      if (modalOpenRef.current || isAnimatingRef.current) return
      const dy = e.touches[0].clientY - startY
      if (Math.abs(dy) < 8) return
      tracking = false
      if (dy < 0) trigger(1)
      else trigger(-1)
    }
    const onTouchEnd = () => { tracking = false }

    // Auto-correct if user drags the scrollbar and leaves in-between
    let snapTimer: number | null = null
    const onScroll = () => {
      if (modalOpenRef.current || isAnimatingRef.current) return
      
      // Simple page detection: if we're closer to bottom, we're on page 1
      const sections = findSections()
      if (sections.length !== 2) return // Ensure we only have 2 sections
      
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const totalHeight = document.documentElement.scrollHeight
      
      // If we're in the bottom half of the scrollable area, we're on page 1
      const currentIdx = scrollY > (totalHeight - viewportHeight) / 2 ? 1 : 0
      
      if (currentIdx !== pageIndexRef.current) {
        pageIndexRef.current = currentIdx
        setCurrentPage(currentIdx)
      }
      
      if (snapTimer) window.clearTimeout(snapTimer)
      snapTimer = window.setTimeout(() => {
        const d0 = Math.abs(scrollY - targetTopForIndex(0))
        const d1 = Math.abs(scrollY - targetTopForIndex(1))
        const idx = d1 < d0 ? 1 : 0
        if (!atPos(idx)) goToIndex(idx, 0.75)
      }, 100)
    }

    const onResize = () => {
      if (modalOpenRef.current) return
      window.scrollTo({ top: targetTopForIndex(pageIndexRef.current), left: 0, behavior: 'auto' })
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: false })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('wheel', onWheel as EventListener)
      window.removeEventListener('keydown', onKey as EventListener)
      window.removeEventListener('touchstart', onTouchStart as EventListener)
      window.removeEventListener('touchmove', onTouchMove as EventListener)
      window.removeEventListener('touchend', onTouchEnd as EventListener)
      window.removeEventListener('scroll', onScroll as EventListener)
      window.removeEventListener('resize', onResize as EventListener)
    }
  }, [])

  // Initialize to page 0 on mount (always start at the first page)
  useEffect(() => {
    pageIndexRef.current = 0
    setCurrentPage(0)
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Overlay panels (always mounted, above content; pointer-events:none) */}
      <div className="pointer-events-none fixed inset-0 z-[998]">
        <div className="split-top split-gradient-top" />
        <div className="split-bottom split-gradient-bottom" />
      </div>



      {/* Subtle Scroll Indicators - Right Side (Hidden on mobile) */}
      <div className="hidden sm:block fixed right-6 top-1/2 transform -translate-y-1/2 z-[997] pointer-events-none">
        <div className="flex flex-col space-y-3">
          {/* Page 1 Indicator */}
          <button
            onClick={() => goToIndex(0)}
            className={`pointer-events-auto w-2 h-8 rounded-full transition-all duration-300 ${
              currentPage === 0
                ? 'bg-white shadow-lg shadow-white/20'
                : 'bg-white/20 hover:bg-white/40'
            }`}
            aria-label="Go to page 1"
          />
          
          {/* Page 2 Indicator */}
          <button
            onClick={() => goToIndex(1)}
            className={`pointer-events-auto w-2 h-8 rounded-full transition-all duration-300 ${
              currentPage === 1
                ? 'bg-white shadow-lg shadow-white/20'
                : 'bg-white/20 hover:bg-white/40'
            }`}
            aria-label="Go to page 2"
          />
        </div>
      </div>




      <Header
        onOpenWhitepaper={() => setWhitepaperOpen(true)}
        onOpenContact={() => setContactOpen(true)}
        onOpenAbout={() => setAboutOpen(true)}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
        isMobileMenuOpen={mobileMenuOpen}
      />

      <JoinUsBar
        isVisible={isJoinUsBarVisible}
        onClose={() => setIsJoinUsBarVisible(false)}
      />

      {/* MAIN: no z-index so header sits above it */}
      <main className="relative">
        {/* Page 1 - HeroSection has its own section tag with data-snap */}
        <HeroSection />

        {/* Page 2 */}
        <section id="countdown-footer" data-snap className="min-h-screen flex flex-col px-4 md:px-8 lg:px-16">
          <div className="flex-1 w-full flex items-center justify-center">
            <div className="w-full max-w-5xl">
              <CountdownSection />
            </div>
          </div>
          <Footer />
        </section>
      </main>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenWhitepaper={() => setWhitepaperOpen(true)}
        onOpenContact={() => setContactOpen(true)}
        onOpenAbout={() => setAboutOpen(true)}
      />

      <WhitepaperModal open={whitepaperOpen} onClose={() => setWhitepaperOpen(false)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  )
}

export default App
