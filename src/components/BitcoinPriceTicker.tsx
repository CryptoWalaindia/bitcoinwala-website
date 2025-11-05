import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import clsx from 'clsx'

interface BitcoinPrice {
  price: number
  change24h: number
  changePercent24h: number
  lastUpdated: string
  isLive?: boolean
}

interface BitcoinPriceTickerProps {
  compact?: boolean
}

const BitcoinPriceTicker: React.FC<BitcoinPriceTickerProps> = ({ compact = false }) => {
  const [bitcoinData, setBitcoinData] = useState<BitcoinPrice | null>({
    price: 95000,
    change24h: 2500,
    changePercent24h: 2.7,
    lastUpdated: new Date().toISOString(),
    isLive: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // API fallback chain - tries each API in order until one succeeds
  const fetchBitcoinPrice = async () => {
    setLoading(true)

    const apis = [
      // Primary: CoinGecko (free, no API key)
      {
        name: 'CoinGecko',
        fetch: async () => {
          const response = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true',
            { headers: { 'Accept': 'application/json' } }
          )
          if (!response.ok) throw new Error(`HTTP ${response.status}`)
          const data = await response.json()
          return {
            price: data.bitcoin.usd,
            changePercent24h: data.bitcoin.usd_24h_change || 0,
          }
        }
      },
      // Fallback 1: Coinbase (free, no API key)
      {
        name: 'Coinbase',
        fetch: async () => {
          const response = await fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot')
          if (!response.ok) throw new Error(`HTTP ${response.status}`)
          const data = await response.json()
          return {
            price: parseFloat(data.data.amount),
            changePercent24h: 0, // Coinbase spot doesn't include 24h change
          }
        }
      },
      // Fallback 2: Blockchain.info (free, no API key)
      {
        name: 'Blockchain.info',
        fetch: async () => {
          const response = await fetch('https://blockchain.info/ticker')
          if (!response.ok) throw new Error(`HTTP ${response.status}`)
          const data = await response.json()
          return {
            price: data.USD.last,
            changePercent24h: 0,
          }
        }
      },
      // Fallback 3: CoinCap (free, no API key)
      {
        name: 'CoinCap',
        fetch: async () => {
          const response = await fetch('https://api.coincap.io/v2/assets/bitcoin')
          if (!response.ok) throw new Error(`HTTP ${response.status}`)
          const data = await response.json()
          return {
            price: parseFloat(data.data.priceUsd),
            changePercent24h: parseFloat(data.data.changePercent24Hr) || 0,
          }
        }
      }
    ]

    // Try each API with timeout
    for (const api of apis) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 8000) // 8 second timeout

        const result = await Promise.race([
          api.fetch(),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), 8000)
          )
        ])

        clearTimeout(timeoutId)

        // Success! Update state and exit
        setBitcoinData({
          price: (result as any).price,
          change24h: (result as any).changePercent24h,
          changePercent24h: (result as any).changePercent24h,
          lastUpdated: new Date().toISOString(),
          isLive: true
        })
        setError(null)
        setLoading(false)
        console.log(`✅ Bitcoin price fetched from ${api.name}`)
        return

      } catch (err) {
        console.warn(`❌ ${api.name} failed:`, err)
        // Continue to next API
      }
    }

    // All APIs failed - use demo data
    console.log('⚠️ All APIs failed, using demo data')
    setError(null)
    setBitcoinData({
      price: 95000,
      change24h: 2500,
      changePercent24h: 2.7,
      lastUpdated: new Date().toISOString(),
      isLive: false
    })
    setLoading(false)
  }

  useEffect(() => {
    // Try to fetch real data first, but don't block the UI
    const tryFetchRealData = async () => {
      try {
        await fetchBitcoinPrice()
      } catch (err) {
        // If it fails, we already have demo data showing
        console.log('Using demo data for Bitcoin price ticker')
      }
    }
    
    tryFetchRealData()
    
    // Then fetch every 30 seconds
    const interval = setInterval(() => {
      tryFetchRealData()
    }, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatChange = (change: number) => {
    const formatted = Math.abs(change).toFixed(2)
    return change >= 0 ? `+${formatted}%` : `-${formatted}%`
  }

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4" />
    if (change < 0) return <TrendingDown className="w-4 h-4" />
    return <Minus className="w-4 h-4" />
  }

  const getTrendColor = (change: number) => {
    if (change > 0) return 'text-green-400'
    if (change < 0) return 'text-red-400'
    return 'text-gray-400'
  }

  if (loading) {
    return (
      <div className={clsx(
        "flex items-center gap-3 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10",
        compact ? "px-3 py-2" : "px-4 py-3"
      )}>
        <div className="flex items-center gap-3">
          <span className={clsx("text-orange-500 font-extrabold drop-shadow-[0_0_12px_rgba(251,146,60,0.5)] transition-all duration-300 font-mono tracking-widest uppercase", compact ? "text-lg" : "text-xl")}>BTC</span>
          <div className="animate-pulse">
            <div className={clsx("bg-white/20 rounded", compact ? "h-5 w-20" : "h-6 w-24")}></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !bitcoinData) {
    return (
      <div className={clsx(
        "flex items-center gap-3 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10",
        compact ? "px-3 py-2" : "px-4 py-3"
      )}>
        <span className={clsx("text-orange-500 font-extrabold drop-shadow-[0_0_12px_rgba(251,146,60,0.5)] transition-all duration-300 font-mono tracking-widest uppercase", compact ? "text-lg" : "text-xl")}>BTC</span>
        <span className={clsx("text-red-400 font-semibold", compact ? "text-base" : "text-lg")}>Error</span>
      </div>
    )
  }

  return (
    <div className="group relative">
      <div className={clsx(
        "flex items-center gap-3 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-black/30 hover:border-white/20 hover:scale-105",
        compact ? "px-3 py-2" : "px-4 py-3"
      )}>
        {/* Bitcoin Symbol - BTC text with modern font */}
        <span className={clsx(
          "text-orange-500 font-extrabold drop-shadow-[0_0_12px_rgba(251,146,60,0.5)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_16px_rgba(251,146,60,0.7)] font-mono tracking-widest uppercase",
          compact ? "text-lg" : "text-xl"
        )}>BTC</span>
        
        {/* Price */}
        <span className={clsx("text-white font-bold font-mono tracking-tight tabular-nums", compact ? "text-base" : "text-lg")}>
          {compact ? `$${Math.round(bitcoinData.price / 1000)}k` : formatPrice(bitcoinData.price)}
        </span>
        
        {/* Change Indicator - Hide on compact mobile */}
        {!compact && (
          <div className={clsx(
            'flex items-center gap-1.5 text-sm font-semibold',
            getTrendColor(bitcoinData.changePercent24h)
          )}>
            {getTrendIcon(bitcoinData.changePercent24h)}
            <span>{formatChange(bitcoinData.changePercent24h)}</span>
          </div>
        )}
      </div>
      
      {/* Tooltip on hover - Both Mobile and Desktop: below ticker */}
      <div className={clsx(
        "absolute px-3 py-2 bg-black/90 backdrop-blur-sm rounded-lg border border-white/20 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-[9999]",
        compact 
          ? "top-full mt-3 left-0 right-0 mx-2" // Mobile: below, full width with margins
          : "top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap" // Desktop: below, centered
      )}>
        <div className="text-center">
          <div className="text-orange-400 font-semibold font-mono tracking-wider">
            Bitcoin (BTC)
            {bitcoinData.isLive && <span className="ml-2 text-green-400 text-xs">● LIVE</span>}
            {!bitcoinData.isLive && <span className="ml-2 text-yellow-400 text-xs">● DEMO</span>}
          </div>
          <div className="text-gray-300 mt-1 font-sans">Price: {formatPrice(bitcoinData.price)}</div>
          <div className="text-gray-300 mt-1 font-sans">24h Change: {formatChange(bitcoinData.changePercent24h)}</div>
          <div className="text-gray-400 text-xs mt-1 font-sans">Updated: {new Date(bitcoinData.lastUpdated).toLocaleTimeString()}</div>
        </div>
        {/* Arrow - Only show on desktop */}
        {!compact && (
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 border-l border-t border-white/20 rotate-45"></div>
        )}
      </div>
    </div>
  )
}

export default BitcoinPriceTicker