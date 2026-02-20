'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const images = [
  { id: 1, size: 'large', delay: 0 },
  { id: 2, size: 'medium', delay: 0.1 },
  { id: 3, size: 'medium', delay: 0.2 },
  { id: 4, size: 'small', delay: 0.3 },
  { id: 5, size: 'small', delay: 0.4 },
]

export default function ImageShowcase() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-playfair text-5xl md:text-6xl font-bold text-center mb-20 text-foreground"
        >
          Precious Moments
        </motion.h2>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
          {/* Large Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden group cursor-pointer relative"
          >
            <div className="w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">👼</div>
                <p className="font-playfair text-2xl font-semibold text-foreground">First Steps</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-3xl" />
          </motion.div>

          {/* Medium Images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden group cursor-pointer relative"
          >
            <div className="w-full h-full bg-gradient-to-br from-secondary/40 to-accent/30 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2">🎂</div>
                <p className="font-playfair text-lg font-semibold text-foreground">Cake Time</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-3xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden group cursor-pointer relative"
          >
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/40 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2">🎉</div>
                <p className="font-playfair text-lg font-semibold text-foreground">Celebrations</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-3xl" />
          </motion.div>

          {/* Small Images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="md:col-span-2 rounded-3xl overflow-hidden group cursor-pointer relative"
          >
            <div className="w-full h-full bg-gradient-to-br from-accent/30 to-primary/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2">💕</div>
                <p className="font-playfair text-lg font-semibold text-foreground">Love & Memories</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-3xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden group cursor-pointer relative"
          >
            <div className="w-full h-full bg-gradient-to-br from-secondary/50 to-primary/30 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-2">🌸</div>
                <p className="font-playfair text-sm font-semibold text-foreground">Beautiful</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
