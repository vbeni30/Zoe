'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function IntroPage() {
  const router = useRouter()
  const [isEntering, setIsEntering] = useState(false)

  const handleNavigate = () => {
    setIsEntering(true)
    setTimeout(() => {
      router.push('/main')
    }, 300)
  }

  return (
    <motion.div
      onClick={handleNavigate}
      className="relative w-full min-h-screen bg-white overflow-hidden cursor-pointer flex flex-col items-center justify-center px-4"
      animate={isEntering ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Subtle textured background */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `
          repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(236,72,153,.03) 35px, rgba(236,72,153,.03) 70px),
          repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(236,72,153,.03) 35px, rgba(236,72,153,.03) 70px)
        `,
      }} />

      {/* Birthday-themed decorative elements */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 500 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Birthday Cake - Bottom Left */}
        <g opacity="0.25">
          <defs>
            <linearGradient id="cakeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
          </defs>
          {/* Cake layers */}
          <rect x="40" y="750" width="60" height="20" rx="2" fill="url(#cakeGradient)" opacity="0.8" />
          <rect x="35" y="730" width="70" height="20" rx="2" fill="url(#cakeGradient)" opacity="0.6" />
          <rect x="30" y="710" width="80" height="20" rx="2" fill="url(#cakeGradient)" opacity="0.4" />
          {/* Frosting swirls */}
          <path d="M 45 745 Q 50 740 55 745 T 65 745 T 75 745" stroke="#ec4899" strokeWidth="1.5" fill="none" opacity="0.5" />
        </g>

        {/* Cake Slice - Top Right */}
        <g opacity="0.25">
          <path d="M 440 150 L 480 150 L 460 200 Z" fill="#ec4899" opacity="0.6" />
          <path d="M 440 150 L 460 200 L 450 210 Z" fill="#db2777" opacity="0.4" />
          {/* Frosting on slice */}
          <path d="M 442 152 Q 460 175 458 198" stroke="#fbbf24" strokeWidth="1.5" fill="none" opacity="0.5" />
        </g>

        {/* Number One - Center Left */}
        <g opacity="0.25">
          <text x="80" y="450" fontSize="120" fontWeight="bold" fill="#ec4899" fontFamily="Georgia" opacity="0.4">1</text>
          <circle cx="110" cy="400" r="35" stroke="#ec4899" strokeWidth="1.5" fill="none" opacity="0.3" />
        </g>

        {/* Single Candle with Flame - Top Left */}
        <g opacity="0.25">
          <rect x="50" y="200" width="8" height="50" fill="#f4a460" opacity="0.5" />
          {/* Candle holder */}
          <circle cx="54" cy="250" r="12" fill="#ec4899" opacity="0.3" />
          {/* Flame */}
          <path d="M 54 190 Q 50 170 54 150 Q 58 170 54 190" fill="#fbbf24" opacity="0.6" />
          <path d="M 54 190 Q 52 175 54 160 Q 56 175 54 190" fill="#fef3c7" opacity="0.4" />
        </g>

        {/* Candle 2 - Right side */}
        <g opacity="0.25">
          <rect x="420" y="280" width="8" height="45" fill="#f4a460" opacity="0.5" />
          <circle cx="424" cy="325" r="10" fill="#ec4899" opacity="0.3" />
          <path d="M 424 273 Q 420 258 424 245 Q 428 258 424 273" fill="#fbbf24" opacity="0.6" />
        </g>

        {/* Candle 3 - Lower Right */}
        <g opacity="0.25">
          <rect x="430" y="580" width="8" height="50" fill="#f4a460" opacity="0.5" />
          <circle cx="434" cy="630" r="12" fill="#ec4899" opacity="0.3" />
          <path d="M 434 570 Q 430 550 434 535 Q 438 550 434 570" fill="#fbbf24" opacity="0.6" />
        </g>

        {/* Balloons - Scattered */}
        {/* Balloon 1 */}
        <g opacity="0.25">
          <circle cx="100" cy="300" r="18" fill="#f472b6" opacity="0.4" />
          <path d="M 100 318 L 100 360" stroke="#ec4899" strokeWidth="1.5" opacity="0.3" />
        </g>

        {/* Balloon 2 */}
        <g opacity="0.25">
          <circle cx="400" cy="450" r="18" fill="#f472b6" opacity="0.4" />
          <path d="M 400 468 L 400 510" stroke="#ec4899" strokeWidth="1.5" opacity="0.3" />
        </g>

        {/* Confetti pieces */}
        <g opacity="0.2">
          <rect x="150" y="350" width="4" height="12" fill="#fbbf24" transform="rotate(45 152 356)" />
          <rect x="350" y="250" width="4" height="12" fill="#f472b6" transform="rotate(-30 352 256)" />
          <rect x="200" y="600" width="4" height="12" fill="#ec4899" transform="rotate(60 202 606)" />
          <rect x="380" y="700" width="4" height="12" fill="#fbbf24" transform="rotate(-45 382 706)" />
        </g>
      </svg>

      {/* Main content */}
      <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center space-y-8"
        >
          <motion.h1
            className="font-playfair text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-pink-600 tracking-tight leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            You're Invited
          </motion.h1>

          <motion.div
            className="h-1 w-20 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-400 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />

          <motion.p
            className="font-lora text-xl sm:text-2xl md:text-2xl text-pink-500/85 font-light tracking-wide max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            to a celebration of elegance and precious moments
          </motion.p>

          {/* <motion.div
            className="pt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <p className="font-lora text-sm md:text-base text-pink-400/70 uppercase tracking-[0.15em] font-light">
              Click anywhere to continue
            </p>
          </motion.div> */}
        </motion.div>
      </div>

      {/* Floating animation indicator */}
      <motion.div
        className="absolute bottom-8 sm:bottom-12 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-pink-300/50 text-center">
          <p className="font-lora text-sm tracking-[0.12em] font-light">CLICK TO ENTER</p>
        </div>
      </motion.div>

      {/* Hover effect overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-pink-200/5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isEntering ? 0 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
