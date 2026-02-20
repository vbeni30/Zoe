'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
}

export default function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
}: AnimatedButtonProps) {
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:shadow-lg',
    secondary: 'bg-secondary text-secondary-foreground border-2 border-primary hover:bg-primary/10',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-8 py-4 rounded-full font-playfair text-lg font-semibold transition-all ${variants[variant]} ${className}`}
    >
      <span className="relative flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  )
}
