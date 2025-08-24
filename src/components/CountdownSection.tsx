import React, { useState } from 'react'
import { useInterval } from 'react-use'
import clsx from 'clsx'

const CountdownSection: React.FC = () => {
  const calculateTimeLeft = () => {
    const now = new Date()
    let targetTime = new Date(now)
    targetTime.setHours(
      now.getHours() + 24,
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    )

    const storedTarget = localStorage.getItem('countdownTarget')
    if (storedTarget) {
      const parsedTarget = new Date(storedTarget)
      if (parsedTarget > now) {
        targetTime = parsedTarget
      } else {
        localStorage.removeItem('countdownTarget')
        localStorage.setItem('countdownTarget', targetTime.toISOString())
      }
    } else {
      localStorage.setItem('countdownTarget', targetTime.toISOString())
    }

    const difference = +targetTime - +now
    if (difference <= 0) {
      const newTarget = new Date(now)
      newTarget.setHours(
        now.getHours() + 24,
        now.getMinutes(),
        now.getSeconds(),
        now.getMilliseconds()
      )
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
    <div className="w-full text-center px-6 sm:px-8 md:px-12 lg:px-16">
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
    </div>
  )
}

export default CountdownSection
