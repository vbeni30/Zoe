'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function ParallaxSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="text-center">
          <div className="text-9xl mb-4 opacity-30">👼</div>
          <p className="font-playfair text-4xl font-bold text-foreground/20">Growing & Glowing</p>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 text-center px-4 max-w-3xl"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-playfair text-6xl md:text-7xl font-bold text-foreground mb-6"
        >
          Watching Her Grow
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-lora text-xl md:text-2xl text-foreground/70 leading-relaxed"
        >
          From the first moment we laid eyes on her to watching her reach this incredible milestone, every day has been a gift. 
          The smiles, the laughter, the sleepy cuddles – these are the moments we'll treasure forever.
        </motion.p>
      </motion.div>
    </section>
  )
}
