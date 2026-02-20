'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 pt-32 relative">
      <div className="text-center max-w-4xl mx-auto">
        {/* Decorative Top Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-block text-7xl mb-4">👶</div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-playfair text-6xl md:text-8xl font-bold text-foreground mb-4 text-balance leading-tight"
        >
          She's
          <span className="block text-primary mt-2">One Year</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-lora text-xl md:text-2xl text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Join us for a celebration of love, laughter, and milestone moments
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-playfair text-lg font-semibold hover:shadow-lg transition-shadow"
          >
            Save the Date
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-playfair text-lg font-semibold border-2 border-primary hover:bg-primary/10 transition-colors"
          >
            Gallery
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-20"
        >
          <p className="text-primary/60 font-lora mb-2">Scroll to explore</p>
          <div className="text-2xl">↓</div>
        </motion.div>
      </div>
    </section>
  )
}
