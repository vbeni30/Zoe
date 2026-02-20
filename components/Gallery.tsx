'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const galleryItems = [
  { id: 1, category: 'Newborn', emoji: '👶' },
  { id: 2, category: 'Smiles', emoji: '😊' },
  { id: 3, category: 'Playtime', emoji: '🎈' },
  { id: 4, category: 'Milestones', emoji: '📸' },
  { id: 5, category: 'Cuddles', emoji: '🤗' },
  { id: 6, category: 'Adventures', emoji: '🌈' },
]

export default function Gallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section id="gallery" className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-foreground mb-6">
            A Year in Moments
          </h2>
          <p className="font-lora text-foreground/60 text-lg max-w-2xl mx-auto">
            Explore our favorite memories from this incredible year of growth and joy
          </p>
        </motion.div>

        {/* Masonry Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group cursor-pointer relative overflow-hidden rounded-3xl ${
                index === 0 ? 'lg:col-span-2 lg:row-span-2' : index === 3 ? 'lg:col-span-2' : ''
              }`}
            >
              <motion.div
                animate={{
                  scale: hoveredId === item.id ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                className={`w-full h-full relative bg-gradient-to-br from-primary/40 via-secondary/40 to-accent/40 flex items-center justify-center min-h-[300px] ${
                  index === 0 ? 'min-h-[500px]' : index === 3 ? 'min-h-[300px]' : 'min-h-[350px]'
                }`}
              >
                {/* Content */}
                <div className="text-center z-10 relative">
                  <motion.div
                    animate={{
                      y: hoveredId === item.id ? -10 : 0,
                      scale: hoveredId === item.id ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-8xl md:text-9xl mb-4"
                  >
                    {item.emoji}
                  </motion.div>
                  <motion.p
                    animate={{
                      opacity: hoveredId === item.id ? 1 : 0.7,
                    }}
                    className="font-playfair text-2xl md:text-3xl font-semibold text-foreground"
                  >
                    {item.category}
                  </motion.p>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              {/* Border Animation */}
              <motion.div
                className="absolute inset-0 rounded-3xl border-2 border-primary/0 group-hover:border-primary/50"
                animate={{
                  borderColor: hoveredId === item.id ? 'rgba(255, 105, 180, 0.5)' : 'rgba(255, 105, 180, 0)',
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Gallery Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="font-lora text-foreground/60 italic text-lg">
            Each moment with you has been a blessing we'll treasure forever
          </p>
        </motion.div>
      </div>
    </section>
  )
}
