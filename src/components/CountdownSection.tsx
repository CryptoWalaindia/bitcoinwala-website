import React, { useState } from 'react'
import { useInterval } from 'react-use'
import clsx from 'clsx'

const CountdownSection: React.FC = () => {
  const calculateTimeLeft = () => {
    const now = new Date()
    
    // Calculate next 6:00 PM IST
    // IST is UTC+5:30, so 6:00 PM IST = 12:30 PM UTC
    const getNext6PMIST = () => {
      // Convert current time to IST
      const nowIST = new Date(now.getTime() + (5.5 * 60 * 60 * 1000)) // Add 5.5 hours for IST
      
      // Set target to 6:00 PM IST today
      let targetIST = new Date(nowIST)
      targetIST.setHours(18, 0, 0, 0) // 6:00 PM IST
      
      // If 6:00 PM IST has already passed today, set it for tomorrow
      if (nowIST >= targetIST) {
        targetIST.setDate(targetIST.getDate() + 1)
      }
      
      // Convert back to local time
      return new Date(targetIST.getTime() - (5.5 * 60 * 60 * 1000))
    }
    
    let targetTime = getNext6PMIST()

    const storedTarget = localStorage.getItem('countdownTarget')
    if (storedTarget) {
      const parsedTarget = new Date(storedTarget)
      if (parsedTarget > now) {
        targetTime = parsedTarget
      } else {
        // If stored target has passed, calculate next 6:00 PM IST
        targetTime = getNext6PMIST()
        localStorage.setItem('countdownTarget', targetTime.toISOString())
      }
    } else {
      localStorage.setItem('countdownTarget', targetTime.toISOString())
    }

    const difference = +targetTime - +now
    if (difference <= 0) {
      // If somehow we reach 0, set next 6:00 PM IST
      const newTarget = getNext6PMIST()
      localStorage.setItem('countdownTarget', newTarget.toISOString())
      return { hours: 24, minutes: 0, seconds: 0 }
    }

    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
  useInterval(() => {
    setTimeLeft(calculateTimeLeft())
  }, 1000)

  const formatTime = (num: number) => String(num).padStart(2, '0')

  return (
    <div className="w-full text-center px-6 sm:px-8 md:px-12 lg:px-16 pt-20 sm:pt-24 md:pt-32 lg:pt-40">
      <p className="text-muted text-xs xs:text-sm sm:text-base md:text-lg uppercase tracking-wide sm:tracking-widest mb-8 sm:mb-10 animate-fade-in-up">
        Next Buying in
      </p>
      
      {/* Mobile: Horizontal layout - broader */}
      <div className="flex justify-center gap-4 xs:gap-6 md:hidden max-w-lg mx-auto">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div
            key={unit}
            className={clsx(
              'border border-border rounded-lg p-4 xs:p-5',
              'flex flex-col items-center justify-center flex-1',
              'bg-surface/10 backdrop-blur-sm',
              'transition-all duration-350 ease-in-out-custom',
              'active:scale-95'
            )}
          >
            <span className="text-primary text-2xl xs:text-3xl font-extrabold mb-2">
              {formatTime(value)}
            </span>
            <span className="text-muted text-xs uppercase tracking-wider">
              {unit}
            </span>
          </div>
        ))}
      </div>
      
      {/* Tablet and up: Grid layout */}
      <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-8 max-w-4xl w-full mx-auto">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div
            key={unit}
            className={clsx(
              'border border-border rounded-lg p-6 lg:p-8',
              'flex flex-col items-center justify-center',
              'bg-surface/10 backdrop-blur-sm',
              'transition-all duration-350 ease-in-out-custom',
              'hover:scale-[1.01] hover:shadow-lg'
            )}
          >
            <span className="text-primary text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-2">
              {formatTime(value)}
            </span>
            <span className="text-muted text-xs lg:text-sm uppercase tracking-wider">
              {unit}
            </span>
          </div>
        ))}
      </div>
      
      {/* Treasury Address */}
      <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16">
        <button className="inline-block px-4 py-2 rounded-full border border-neutral-800/50 bg-neutral-900/30 backdrop-blur-sm
                          transition-all duration-300 ease-in-out
                          hover:scale-110 hover:bg-neutral-800/40 hover:border-neutral-700/60
                          hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]
                          active:scale-105 cursor-pointer
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl tracking-wider animate-fade-in-up font-medium
                        bg-gradient-to-r from-neutral-300 via-white to-neutral-300 text-transparent bg-clip-text
                        drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 text-transparent bg-clip-text
                             drop-shadow-[0_0_8px_rgba(251,146,60,0.3)]">bitcoin</span><span className="text-neutral-400">walatreasury.</span><span className="bg-gradient-to-r from-orange-400 to-orange-500 text-transparent bg-clip-text
                             drop-shadow-[0_0_8px_rgba(251,146,60,0.3)]">btc</span>
          </p>
        </button>
      </div>
    </div>
  )
}

export default CountdownSection
