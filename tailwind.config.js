// tailwind.config.js
import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        background: '#0B0B0B',
        primary: '#F2F2F2',
        muted: '#A0A0A0',
        border: '#1A1A1A',
      },
      fontFamily: {
        // Anything using `font-sans` will render in Inter
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        // Keep your Orbitron utility for display sections
        orbitron: ['Orbitron', 'sans-serif'],
        // Optional alias if you want a `font-display` utility
        display: ['Orbitron', ...defaultTheme.fontFamily.sans],
      },
      transitionTimingFunction: {
        'ease-in-out-custom': 'cubic-bezier(0.4, 0, 0.2, 1)', // Default ease-in-out
      },
      transitionDuration: {
        '200': '200ms',
        '350': '350ms',
      },
    },
  },
  plugins: [],
}
