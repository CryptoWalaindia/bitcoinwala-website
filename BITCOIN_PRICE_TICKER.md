# Bitcoin Price Ticker Feature

## Overview
The Bitcoin Price Ticker displays real-time Bitcoin price data in the website header, providing users with up-to-date market information.

## Features
- **Real-time Price Updates**: Fetches Bitcoin price every 30 seconds
- **24h Change Indicator**: Shows price change with color-coded trend arrows
- **Responsive Design**: 
  - Compact version for mobile devices (shows simplified price)
  - Full version for desktop (shows price + change percentage)
- **Interactive Tooltip**: Hover to see detailed information
- **Error Handling**: Graceful fallback with demo data if API fails
- **Loading States**: Smooth loading animations

## Technical Implementation

### API Source
- **Provider**: CoinGecko API (free, no API key required)
- **Endpoint**: `https://api.coingecko.com/api/v3/simple/price`
- **Update Frequency**: Every 30 seconds
- **Timeout**: 10 seconds per request

### Components
- `BitcoinPriceTicker.tsx`: Main component with price fetching logic
- Integrated into `Header.tsx` component

### Props
- `compact?: boolean` - Enables compact mode for mobile displays

### Responsive Behavior
- **Mobile (< 640px)**: Compact ticker with large "BTC" text (text-lg) and "$95k" format
- **Desktop (≥ 640px)**: Full ticker with extra-large "BTC" text (text-xl), "$95,000" + change percentage

### Error Handling
- Network timeout protection
- Graceful fallback to demo data
- Maintains last known good data on update failures
- Visual error indicators

### Styling
- Dark theme with glassmorphism effect
- Large, prominent "BTC" text in orange with glowing drop-shadow effect
- Modern typography with monospace fonts:
  - BTC label: `font-mono` with `tracking-widest` for tech aesthetic
  - Price display: `font-mono` with `tabular-nums` for consistent number alignment
- Color-coded change indicators:
  - Green: Positive change
  - Red: Negative change
  - Gray: No change
- Smooth hover animations and scaling effects
- Interactive BTC text that scales on hover
- Bold, readable typography optimized for financial data display

## Usage
The ticker automatically appears in the header and requires no user interaction. Users can:
- View current Bitcoin price at a glance
- See 24-hour price change trend
- Hover for detailed tooltip information
- Experience responsive design across all devices

## Future Enhancements
- Multiple cryptocurrency support
- Price alerts/notifications
- Historical price charts
- Currency conversion options
- Customizable update intervals