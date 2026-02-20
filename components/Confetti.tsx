'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const Confetti = ({ trigger = false }: { trigger?: boolean }) => {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number }>>([])

  useEffect(() => {
    if (trigger) {
      const pieces = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
      }))
      setConfetti(pieces)
    }
  }, [trigger])

  return (
    <>
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            opacity: 1,
            y: -10,
            x: `${piece.left}%`,
            rotate: 0,
          }}
          animate={{
            opacity: 0,
            y: '100vh',
            rotate: 360,
          }}
          transition={{
            duration: 2.5,
            delay: piece.delay,
            ease: 'easeIn',
          }}
          className="fixed pointer-events-none text-2xl"
        >
          {['🎉', '🎀', '💕', '✨', '🎈'][Math.floor(Math.random() * 5)]}
        </motion.div>
      ))}
    </>
  )
}

export default Confetti
