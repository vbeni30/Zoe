'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary/10 via-background to-secondary/10 border-t border-border/30">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-4">
            With Love & Gratitude
          </h3>
          <p className="font-lora text-foreground/60 mb-8 max-w-2xl mx-auto leading-relaxed">
            Thank you for being part of our journey. Your love and support mean everything to us and our precious little one.
          </p>

          <div className="flex justify-center gap-8 mb-8">
            <motion.div whileHover={{ scale: 1.1 }} className="text-4xl cursor-pointer">
              💕
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} className="text-4xl cursor-pointer">
              🌸
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} className="text-4xl cursor-pointer">
              ✨
            </motion.div>
          </div>

          <p className="font-lora text-foreground/50 text-sm">
            © 2024 Baby Girl's First Birthday. All moments cherished forever.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
