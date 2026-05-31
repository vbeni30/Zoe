'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  type MotionValue,
} from 'framer-motion'
import { Cake, Candy, Gift, Heart, PartyPopper, Sparkles, Star } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type FloatItem = {
  id: string
  kind: 'icon' | 'balloon' | 'confetti' | 'sparkle'
  top: string
  left?: string
  right?: string
  size: number
  delay: number
  speed: number
  drift?: number
  color?: string
  Icon?: LucideIcon
  parallax?: number
}

function BalloonSvg({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size * 1.35} viewBox="0 0 24 32" fill="none" aria-hidden>
      <ellipse cx="12" cy="11" rx="8" ry="10" fill={color} fillOpacity="0.35" stroke={color} strokeWidth="1.2" strokeOpacity="0.55" />
      <path d="M12 21 Q10 24 12 28 Q14 24 12 21" stroke={color} strokeWidth="1" strokeOpacity="0.45" fill="none" />
    </svg>
  )
}

function ConfettiDot({ size, color }: { size: number; color: string }) {
  return (
    <span
      className="block rounded-full"
      style={{ width: size, height: size, backgroundColor: color, opacity: 0.45 }}
    />
  )
}

function SparkleSvg({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
    </svg>
  )
}

function FloatingDecor({
  item,
  mouseX,
  mouseY,
}: {
  item: FloatItem
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}) {
  const px = item.parallax ?? 0.04
  const x = useTransform(mouseX, [-400, 400], [-20 * px, 20 * px])
  const yParallax = useTransform(mouseY, [-400, 400], [-16 * px, 16 * px])

  const positionStyle: React.CSSProperties = {
    top: item.top,
    ...(item.left ? { left: item.left } : {}),
    ...(item.right ? { right: item.right } : {}),
  }

  const drift = item.drift ?? 18

  return (
    <motion.div className="absolute pointer-events-none" style={{ ...positionStyle, x, y: yParallax }}>
      <motion.div
        animate={{
          y: [0, -drift, 0],
          x: item.kind === 'confetti' ? [0, 6, -4, 0] : [0, 8, 0],
          opacity: item.kind === 'confetti' ? [0.25, 0.55, 0.25] : [0.22, 0.48, 0.22],
          rotate: item.kind === 'icon' ? [-8, 8, -8] : item.kind === 'confetti' ? [0, 180, 360] : [0, 0, 0],
          scale: item.kind === 'sparkle' ? [0.9, 1.1, 0.9] : [1, 1.05, 1],
        }}
        transition={{
          duration: item.speed + 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: item.delay,
        }}
      >
      {item.kind === 'icon' && item.Icon && (
        <item.Icon size={item.size} strokeWidth={1.35} className="text-pink-400/75" />
      )}
      {item.kind === 'balloon' && <BalloonSvg size={item.size} color={item.color ?? '#f472b6'} />}
      {item.kind === 'confetti' && <ConfettiDot size={item.size} color={item.color ?? '#fb7185'} />}
      {item.kind === 'sparkle' && (
        <span className="text-pink-400/40">
          <SparkleSvg size={item.size} />
        </span>
      )}
      </motion.div>
    </motion.div>
  )
}

const FLOATING_ITEMS: FloatItem[] = [
  { id: 'cake-1', kind: 'icon', Icon: Cake, top: '8%', left: '10%', size: 28, delay: 0, speed: 5, parallax: 0.06 },
  { id: 'popper-1', kind: 'icon', Icon: PartyPopper, top: '14%', right: '9%', size: 30, delay: 1.2, speed: 6, parallax: 0.05 },
  { id: 'gift-1', kind: 'icon', Icon: Gift, top: '78%', left: '8%', size: 26, delay: 0.5, speed: 4.5, parallax: 0.07 },
  { id: 'candy-1', kind: 'icon', Icon: Candy, top: '68%', right: '12%', size: 25, delay: 1.8, speed: 5.5, parallax: 0.04 },
  { id: 'heart-1', kind: 'icon', Icon: Heart, top: '32%', left: '4%', size: 22, delay: 2.1, speed: 4, parallax: 0.08 },
  { id: 'star-1', kind: 'icon', Icon: Star, top: '48%', right: '5%', size: 23, delay: 0.9, speed: 6.5, parallax: 0.05 },
  { id: 'sparkles-1', kind: 'icon', Icon: Sparkles, top: '22%', left: '28%', size: 21, delay: 1.5, speed: 5, parallax: 0.03 },
  { id: 'cake-2', kind: 'icon', Icon: Cake, top: '82%', right: '22%', size: 24, delay: 2.4, speed: 4.8, parallax: 0.06 },

  { id: 'balloon-1', kind: 'balloon', top: '18%', left: '6%', size: 30, delay: 0.3, speed: 7, color: '#f9a8d4', parallax: 0.09 },
  { id: 'balloon-2', kind: 'balloon', top: '12%', right: '18%', size: 26, delay: 1.6, speed: 6.2, color: '#fda4af', parallax: 0.07 },
  { id: 'balloon-3', kind: 'balloon', top: '62%', left: '14%', size: 28, delay: 0.8, speed: 5.8, color: '#fbcfe8', parallax: 0.06 },
  { id: 'balloon-4', kind: 'balloon', top: '70%', right: '6%', size: 32, delay: 2, speed: 7.5, color: '#f472b6', parallax: 0.08 },

  { id: 'confetti-1', kind: 'confetti', top: '26%', left: '88%', size: 9, delay: 0, speed: 3.5, color: '#fb7185', drift: 22 },
  { id: 'confetti-2', kind: 'confetti', top: '38%', left: '12%', size: 8, delay: 1.1, speed: 4, color: '#f472b6', drift: 16 },
  { id: 'confetti-3', kind: 'confetti', top: '52%', right: '14%', size: 10, delay: 0.6, speed: 3.8, color: '#fda4af', drift: 20 },
  { id: 'confetti-4', kind: 'confetti', top: '86%', left: '42%', size: 8, delay: 1.9, speed: 4.2, color: '#ec4899', drift: 14 },
  { id: 'confetti-5', kind: 'confetti', top: '10%', left: '52%', size: 7, delay: 2.3, speed: 3.2, color: '#f9a8d4', drift: 18 },
  { id: 'confetti-6', kind: 'confetti', top: '44%', left: '92%', size: 8, delay: 1.4, speed: 4.5, color: '#fb7185', drift: 15 },

  { id: 'sparkle-1', kind: 'sparkle', top: '36%', left: '20%', size: 17, delay: 0.4, speed: 5.5, parallax: 0.04 },
  { id: 'sparkle-2', kind: 'sparkle', top: '56%', left: '78%', size: 19, delay: 1.7, speed: 6, parallax: 0.05 },
  { id: 'sparkle-3', kind: 'sparkle', top: '88%', left: '18%', size: 15, delay: 2.2, speed: 4.5, parallax: 0.03 },
  { id: 'sparkle-4', kind: 'sparkle', top: '6%', left: '72%', size: 16, delay: 0.7, speed: 5.2, parallax: 0.04 },
]

export default function IntroPage() {
  const router = useRouter()
  const [isEntering, setIsEntering] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 30, stiffness: 100, mass: 0.5 }
  const cardX = useSpring(useTransform(mouseX, [-400, 400], [-10, 10]), springConfig)
  const cardY = useSpring(useTransform(mouseY, [-400, 400], [-10, 10]), springConfig)
  const bgX = useSpring(useTransform(mouseX, [-400, 400], [20, -20]), springConfig)
  const bgY = useSpring(useTransform(mouseY, [-400, 400], [20, -20]), springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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
    }, 900)
  }

  return (
    <motion.div
      onClick={handleNavigate}
      className="relative w-full min-h-screen bg-pattern-pink-soft overflow-hidden cursor-pointer flex flex-col items-center justify-center px-4 select-none"
      animate={isEntering ? { backgroundColor: '#ffe6f3' } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ backgroundColor: 'var(--pink-bg-soft)', x: bgX, y: bgY }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[10%] -left-[5%] w-[50vw] h-[50vw] rounded-full opacity-60 blur-[100px]"
        />
        <motion.div
          style={{ backgroundColor: 'var(--pink-bg-soft)', x: bgY, y: bgX }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-[15%] -right-[5%] w-[60vw] h-[60vw] rounded-full opacity-70 blur-[120px]"
        />
      </div>

      {/* Floating birthday layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]" aria-hidden>
        {FLOATING_ITEMS.map((item) => (
          <FloatingDecor key={item.id} item={item} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </div>

      <motion.div
        style={{ x: cardX, y: cardY }}
        animate={isEntering ? { scale: 1.1, opacity: 0, filter: 'blur(8px)' } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-2xl w-full mx-auto"
      >
        {/* Corner floaters on the card */}
        <motion.div
          className="absolute -left-2 -top-2 text-pink-400/40 sm:-left-5 sm:-top-5"
          animate={{ y: [0, -6, 0], rotate: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        >
          <PartyPopper className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.35} />
        </motion.div>
        <motion.div
          className="absolute -right-2 -top-3 text-pink-400/40 sm:-right-5 sm:-top-6"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          aria-hidden
        >
          <BalloonSvg size={28} color="#f472b6" />
        </motion.div>
        <motion.div
          className="absolute -bottom-3 -left-3 text-pink-400/40 sm:-bottom-5 sm:-left-6"
          animate={{ y: [0, 6, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          aria-hidden
        >
          <Gift className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.35} />
        </motion.div>
        <motion.div
          className="absolute -bottom-2 -right-2 text-pink-400/40 sm:-bottom-4 sm:-right-5"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          aria-hidden
        >
          <Cake className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.35} />
        </motion.div>

        <div className="backdrop-blur-md bg-white/40 border border-white/70 rounded-[40px] px-6 py-16 sm:p-20 text-center shadow-[0_20px_50px_rgba(244,114,182,0.1)] flex flex-col items-center gap-8 group transition-all duration-500 hover:border-pink-300/40 hover:shadow-[0_24px_60px_rgba(244,114,182,0.15)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="relative flex h-14 w-14 items-center justify-center rounded-full border border-pink-300/40 bg-white/30 text-pink-500/70 shadow-inner"
          >
            <Cake className="h-6 w-6" strokeWidth={1.5} />
            <motion.span
              className="absolute -right-1 -top-1 text-pink-400/60"
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              aria-hidden
            >
              <Sparkles className="h-4 w-4" strokeWidth={2} />
            </motion.span>
          </motion.div>

          <div className="space-y-4">
            <motion.p
              initial={{ letterSpacing: '0.2em', opacity: 0 }}
              animate={{ letterSpacing: '0.3em', opacity: 0.5 }}
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              transition={{ delay: 0.55, duration: 0.8 }}
              className="flex items-center justify-center gap-4 pt-1 text-pink-400/85"
              aria-hidden
            >
              <Cake className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={1.5} />
              <Star className="h-4 w-4 fill-pink-200/60 text-pink-300/70 sm:h-4.5 sm:w-4.5" strokeWidth={1.5} />
              <PartyPopper className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={1.5} />
              <Heart className="h-4 w-4 fill-pink-200/50 text-pink-300/70 sm:h-4.5 sm:w-4.5" strokeWidth={1.5} />
              <Gift className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={1.5} />
            </motion.div>
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-pink-400/60 to-transparent"
          />

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

      <motion.div
        className="absolute inset-x-0 bottom-12 z-20 flex flex-col items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
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
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
