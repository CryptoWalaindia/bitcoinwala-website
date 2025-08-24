import React from 'react'
import { Instagram, Linkedin } from 'lucide-react'
import clsx from 'clsx'

/** X (formerly Twitter) brand mark */
const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.244 2.25h3.308L13.62 10.482l8.443 11.268h-5.495l-5.559-7.336-6.38 7.336H1.5l7.621-8.7L1.757 2.25H7.5l5.006 6.699 5.738-6.699Z"
      fill="currentColor"
    />
  </svg>
)

const Footer: React.FC = () => {
  const year = new Date().getFullYear()

  const iconBtn =
    'inline-flex items-center justify-center h-12 w-12 sm:h-10 sm:w-10 rounded-full border border-[#1A1A1A] text-muted hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 transition active:scale-95'

  return (
    <footer className="w-full border-t border-[#1A1A1A] py-6 sm:py-8">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center gap-4 sm:gap-5">
        {/* Centered © line */}
        <p className="text-[11px] sm:text-[12px] md:text-[13px] text-muted text-center">
          © {year} BitcoinWala. All rights reserved.
        </p>

        {/* Socials centered below */}
        <nav aria-label="Social links" className="flex items-center justify-center gap-3 sm:gap-4">
          <a
            href="https://x.com/Bitcoinwalax?t=QAvtDDRvodn-kLCm4-2VQw&s=09"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className={clsx(iconBtn)}
            title="X (Twitter)"
          >
            <XIcon className="h-4 w-4" />
          </a>
          <a
            href="https://www.instagram.com/bitcoinwalax/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={clsx(iconBtn)}
            title="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/company/bitcoinwalaofficial/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={clsx(iconBtn)}
            title="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
