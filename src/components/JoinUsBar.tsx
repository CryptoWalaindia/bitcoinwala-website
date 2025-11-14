import React from 'react'
import { motion } from 'framer-motion'
import { X, Twitter, Instagram } from 'lucide-react'
import clsx from 'clsx'

interface JoinUsBarProps {
  isVisible: boolean
  onClose: () => void
}

const JoinUsBar: React.FC<JoinUsBarProps> = ({ isVisible, onClose }) => {
  return (
    <motion.div
      initial={{ y: '-100%' }}
      animate={{ y: isVisible ? '0%' : '-100%' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={clsx(
        'fixed top-0 left-0 right-0 z-40', // Z-index lower than header
        'h-[60px] bg-background border-b border-border',
        'flex items-center justify-center',
        'px-4 md:px-8 lg:px-16',
        'max-w-[1200px] mx-auto', // Centered content
        'transform', // Enable transform for animation
      )}
    >
      <div className="flex items-center space-x-6">
        <span className="text-muted text-sm md:text-base uppercase tracking-widest">
          Join us
        </span>
        <div className="flex space-x-4">
          <a
            href="https://x.com/Bitcoinwalax?t=QAvtDDRvodn-kLCm4-2VQw&s=09"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-muted transition-colors duration-200"
            aria-label="BitcoinWala on X (formerly Twitter)"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/bitcoinwalax/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-muted transition-colors duration-200"
            aria-label="BitcoinWala on Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
      {/* Close button (optional, as the plus button also toggles) */}
      {/* <button
        onClick={onClose}
        className="absolute right-4 text-primary hover:text-muted transition-colors duration-200"
        aria-label="Close join bar"
      >
        <X className="w-5 h-5" />
      </button> */}
    </motion.div>
  )
}

export default JoinUsBar
