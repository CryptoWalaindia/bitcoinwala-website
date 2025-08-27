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
          width: 5ch;
          text-align: center;
          position: relative;
        }
        
        @media (min-width: 480px) {
          .flip-container {
            width: 6ch;
          }
        }
        
        @media (min-width: 640px) {
          .flip-container {
            width: 8ch;
          }
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
        {/* MISSION → responsive sizing to prevent cutoff */}
        <h1
          className="
            text-5xl xs:text-6xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 
            uppercase tracking-wide sm:tracking-wider md:tracking-widest leading-tight mb-6 sm:mb-6 
            animate-fade-in-up px-2 sm:px-0
            bg-gradient-to-b from-white via-neutral-200 to-neutral-400 text-transparent bg-clip-text
            drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] sm:drop-shadow-[0_0_18px_rgba(255,255,255,0.35)]
          "
        >
          MISSION
        </h1>

        {/* Subtitle in single line - improved mobile sizing */}
        <div className="text-muted animate-fade-in-up delay-100 px-2 sm:px-4">
          <div className="flex items-center justify-center gap-1 xs:gap-2 sm:gap-3 md:gap-4 text-xs xs:text-sm sm:text-lg md:text-xl lg:text-2xl tracking-wide sm:tracking-widest overflow-hidden">
            <span className="flex-shrink-0">1 MILLION</span>
            <span className="text-orange-500 flex-shrink-0">BITCOIN</span>
            <div className={`flip-container ${showYear ? 'flipped' : ''} flex-shrink-0`}>
              <div className="flip-inner">
                <div className="flip-front">
                  <span>5 YEARS</span>
                </div>
                <div className="flip-back">
                  <span>BY 2030</span>
                </div>
              </div>
            </div>
            <span className="text-xs xs:text-sm sm:text-lg md:text-xl lg:text-2xl text-muted flex-shrink-0">•</span>
            <span className="flex-shrink-0">ALL IN</span>
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
