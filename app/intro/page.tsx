'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

export default function IntroPage() {
  const router = useRouter()
  const [isEntering, setIsEntering] = useState(false)

  // Advanced Parallax: Smooth mouse tracking values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs to dampen the mouse movement for luxury feel
  const springConfig = { damping: 30, stiffness: 100, mass: 0.5 }
  const cardX = useSpring(useTransform(mouseX, [-400, 400], [-10, 10]), springConfig)
  const cardY = useSpring(useTransform(mouseY, [-400, 400], [-10, 10]), springConfig)
  const bgX = useSpring(useTransform(mouseX, [-400, 400], [20, -20]), springConfig)
  const bgY = useSpring(useTransform(mouseY, [-400, 400], [20, -20]), springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to center of screen
      const x = e.clientX - window.innerWidth / 2
      const y = e.clientY - window.innerHeight / 2
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const handleNavigate = () => {
    setIsEntering(true)
    setTimeout(() => {
      router.push('/main')
    }, 900) // Perfect timing allowance for cinematic zoom
  }

  // Pure procedural decorative items mapped across the layout canvas
  const floatingElements = [
    { id: 1, top: '12%', left: '15%', size: 16, delay: 0, speed: 4 },
    { id: 2, top: '22%', left: '80%', size: 24, delay: 1.5, speed: 6 },
    { id: 3, top: '75%', left: '12%', size: 20, delay: 0.8, speed: 5 },
    { id: 4, top: '68%', left: '85%', size: 14, delay: 2.2, speed: 4 },
    { id: 5, top: '45%', left: '8%', size: 12, delay: 1.2, speed: 7 },
  ]

  return (
    <motion.div
      onClick={handleNavigate}
      className="relative w-full min-h-screen bg-pattern-pink-soft overflow-hidden cursor-pointer flex flex-col items-center justify-center px-4 select-none"
      animate={isEntering ? { backgroundColor: '#ffe6f3' } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Dynamic Parallax Lighting Blobs using your exact CSS variables */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ backgroundColor: 'var(--pink-bg-soft)', x: bgX, y: bgY }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[5%] w-[50vw] h-[50vw] rounded-full opacity-60 blur-[100px]" 
        />
        <motion.div 
          style={{ backgroundColor: 'var(--pink-bg-soft)', x: bgY, y: bgX }} // inverted pathing for natural depth contrast
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-[15%] -right-[5%] w-[60vw] h-[60vw] rounded-full opacity-70 blur-[120px]" 
        />
      </div>

      {/* Procedural Flurry System - replaces raw SVGs with elegant floating sparkles */}
      {floatingElements.map((elem) => (
        <motion.div
          key={elem.id}
          className="absolute pointer-events-none text-pink-400/30"
          style={{ top: elem.top, left: elem.left }}
          animate={{
            y: [0, -25, 0],
            x: [0, 10, 0],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: elem.speed + 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: elem.delay,
          }}
        >
          <svg width={elem.size} height={elem.size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
          </svg>
        </motion.div>
      ))}

      {/* The Central Premium Vellum Invitation Container */}
      <motion.div
        style={{ x: cardX, y: cardY }}
        animate={isEntering ? { scale: 1.1, opacity: 0, filter: 'blur(8px)' } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-2xl w-full mx-auto"
      >
        {/* Layered Translucent Card Panel */}
        <div className="backdrop-blur-md bg-white/40 border border-white/70 rounded-[40px] px-6 py-16 sm:p-20 text-center shadow-[0_20px_50px_rgba(244,114,182,0.1)] flex flex-col items-center gap-8 group transition-all duration-500 hover:border-pink-300/40 hover:shadow-[0_24px_60px_rgba(244,114,182,0.15)]">
          
          {/* Minimalist Crest Ornament */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="w-10 h-10 rounded-full border border-pink-300/40 flex items-center justify-center text-pink-500/60 text-sm font-light shadow-inner"
          >
            ✧
          </motion.div>

          {/* Core Invitation Header Typography */}
          <div className="space-y-4">
            <motion.p
              initial={{ letterSpacing: "0.2em", opacity: 0 }}
              animate={{ letterSpacing: "0.3em", opacity: 0.5 }}
              transition={{ delay: 0.2, duration: 1.2 }}
              className="text-xs uppercase font-sans tracking-[0.25em] text-slate-500 font-semibold text-balance"
            >
              The Honor of Your Presence is Requested
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.9 }}
              className="font-sans text-sm font-semibold uppercase tracking-[0.35em] text-pink-600/90 sm:text-base"
            >
              Zoe&apos;s First Birthday
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal text-transparent bg-clip-text bg-gradient-to-b from-slate-800 to-pink-900 tracking-tight leading-none text-balance"
            >
              You&apos;re Invited to Celebrate
            </motion.h1>
          </div>

          {/* Premium Tailored Line Separator */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-pink-400/60 to-transparent"
          />

          {/* Descriptive Invite Prompt */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="font-serif italic text-xl sm:text-2xl text-slate-600 font-light max-w-md mx-auto leading-relaxed text-balance"
          >
            Join us as we celebrate Zoe turning one — a year of love, laughter, and beautiful memories
          </motion.p>
        </div>
      </motion.div>

      {/* Modern, Floating Bottom Call-To-Action Affordance */}
      <motion.div
        className="absolute inset-x-0 bottom-12 z-20 flex flex-col items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex w-full max-w-xs flex-col items-center gap-2 text-center"
        >
          <span className="w-full text-center font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-pink-600/70">
            Tap anywhere to open
          </span>
          <svg 
            width="12" 
            height="12" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            className="text-pink-400/80"
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}