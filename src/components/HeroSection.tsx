import React, { useState, useEffect } from 'react'

const HeroSection: React.FC = () => {
  const [showYear, setShowYear] = useState(false)

  useEffect(() => {
    // Start the flip animation after 3 seconds, then repeat every 2 seconds
    const initialTimer = setTimeout(() => {
      setShowYear(true)
    }, 3000)

    const interval = setInterval(() => {
      setShowYear(prev => !prev)
    }, 2000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [])
  return (
    <>
      <style>{`
        .flip-container {
          perspective: 1000px;
          display: inline-block;
          vertical-align: baseline;
          width: 8ch;
          text-align: center;
          position: relative;
        }
        
        .flip-inner {
          position: relative;
          width: 100%;
          height: 1.2em;
          transition: transform 0.8s ease-in-out;
          transform-style: preserve-3d;
        }
        
        .flip-container.flipped .flip-inner {
          transform: rotateX(180deg);
        }
        
        .flip-front, .flip-back {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
        }
        
        .flip-back {
          transform: rotateX(180deg);
        }
      `}</style>
      
      <section
        id="hero"
        data-snap
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 sm:px-8 md:px-12 lg:px-16 pt-[60px] sm:pt-[70px] md:pt-[80px]"
      >
      <div className="w-full max-w-6xl mx-auto text-center -mt-20 sm:-mt-12 md:-mt-16">
        {/* MISSION → brighter, glow, premium gradient - Made bigger for mobile */}
        <h1
          className="
            text-7xl xs:text-8xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 
            uppercase tracking-wider sm:tracking-widest leading-tight mb-6 sm:mb-6 
            animate-fade-in-up
            bg-gradient-to-b from-white via-neutral-200 to-neutral-400 text-transparent bg-clip-text
            drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] sm:drop-shadow-[0_0_18px_rgba(255,255,255,0.35)]
          "
        >
          MISSION
        </h1>

        {/* Subtitle in single line */}
        <div className="text-muted text-base xs:text-lg sm:text-lg md:text-xl lg:text-2xl tracking-wide sm:tracking-widest animate-fade-in-up delay-100">
          <div className="flex items-center justify-center gap-2 xs:gap-3 sm:gap-4 whitespace-nowrap">
            <span>1 MILLION</span>
            <span className="text-orange-500">BITCOIN</span>
            <div className={`flip-container ${showYear ? 'flipped' : ''}`}>
              <div className="flip-inner">
                <div className="flip-front">
                  <span>5 YEARS</span>
                </div>
                <div className="flip-back">
                  <span>BY 2030</span>
                </div>
              </div>
            </div>
            <span className="text-lg xs:text-xl sm:text-2xl text-muted">•</span>
            <span>ALL IN</span>
          </div>
        </div>
      </div>

      {/* Bottom Edge Line stays pinned */}
      <div className="absolute bottom-0 left-0 right-0 w-full border-t border-border py-4 sm:py-4 bg-background/80 backdrop-blur-sm">
        <div className="flex justify-center px-4">
          <span
            className="
              text-sm sm:text-sm md:text-sm lg:text-base text-neutral-300 
              tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em]
              font-light uppercase transition-colors duration-300
              hover:text-white text-center animate-fade-in-up
            "
            style={{ animationDelay: '0.3s' }}
          >
            ‹ Stock listing soon ›
          </span>
        </div>
        </div>
      </section>
    </>
  )
}

export default HeroSection
