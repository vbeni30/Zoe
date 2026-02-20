'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, Users } from 'lucide-react'

export default function InvitationDetails() {
  const details = [
    {
      icon: Calendar,
      label: 'Date',
      value: 'Saturday, June 15th, 2024',
    },
    {
      icon: Clock,
      label: 'Time',
      value: '2:00 PM - 5:00 PM',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Botanical Gardens, Downtown',
    },
    {
      icon: Users,
      label: 'Dress Code',
      value: 'Smart Casual Elegance',
    },
  ]

  return (
    <section id="details" className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="font-lora text-primary text-lg mb-4 tracking-widest">DEAR LOVED ONE</p>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-foreground mb-6">
            You Are Cordially Invited
          </h2>
          <p className="font-lora text-foreground/60 text-lg max-w-2xl mx-auto leading-relaxed">
            To join us in celebrating one of the most precious milestones in our family's journey
          </p>
        </motion.div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {details.map((detail, index) => {
            const Icon = detail.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-card rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 text-center h-full">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="inline-block mb-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="text-primary w-8 h-8" />
                    </div>
                  </motion.div>

                  <p className="font-lora text-foreground/60 text-sm mb-2 tracking-widest">
                    {detail.label}
                  </p>
                  <p className="font-playfair text-2xl font-semibold text-foreground">
                    {detail.value}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Special Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-secondary/40 to-accent/30 rounded-3xl p-8 md:p-12 text-center border border-primary/20"
        >
          <p className="font-playfair text-4xl font-semibold text-foreground mb-4">
            A Year of Miracles
          </p>
          <p className="font-lora text-foreground/70 text-lg leading-relaxed max-w-3xl mx-auto">
            This past year has been filled with countless precious moments, first smiles, and endless love.
            We would be honored to have you join us as we celebrate this incredible milestone with cake, joy,
            and the warmth of family and close friends.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
