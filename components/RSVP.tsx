'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Heart } from 'lucide-react'

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '1',
    attending: 'yes',
    dietary: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', guests: '1', attending: 'yes', dietary: '' })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <section id="rsvp" className="py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-lora text-primary text-lg mb-4 tracking-widest">PLEASE RESPOND</p>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-foreground mb-6">
            We'd Love Your Company
          </h2>
          <p className="font-lora text-foreground/60 text-lg">
            Kindly RSVP by June 1st to help us celebrate properly
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-card rounded-3xl p-8 md:p-12 border border-border/50 shadow-lg"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <label className="block font-playfair text-lg font-semibold text-foreground mb-3">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:border-primary transition-colors font-lora"
                  placeholder="Enter your full name"
                />
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                viewport={{ once: true }}
              >
                <label className="block font-playfair text-lg font-semibold text-foreground mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:border-primary transition-colors font-lora"
                  placeholder="your.email@example.com"
                />
              </motion.div>

              {/* Attendance Grid */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {/* Attending */}
                <div>
                  <label className="block font-playfair text-lg font-semibold text-foreground mb-4">
                    Will You Be Joining Us?
                  </label>
                  <div className="space-y-3">
                    {['yes', 'no', 'maybe'].map((option) => (
                      <label key={option} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="attending"
                          value={option}
                          checked={formData.attending === option}
                          onChange={handleChange}
                          className="w-5 h-5 text-primary cursor-pointer"
                        />
                        <span className="ml-3 font-lora text-foreground capitalize group-hover:text-primary transition-colors">
                          {option === 'yes' ? "Yes, I'll be there! 🎉" : option === 'no' ? "Sorry, can't make it 😢" : 'Maybe, will let you know'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="block font-playfair text-lg font-semibold text-foreground mb-3">
                    Number of Guests
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-6 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:border-primary transition-colors font-lora"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>

              {/* Dietary Preferences */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                viewport={{ once: true }}
              >
                <label className="block font-playfair text-lg font-semibold text-foreground mb-3">
                  Dietary Preferences (Optional)
                </label>
                <textarea
                  name="dietary"
                  value={formData.dietary}
                  onChange={handleChange}
                  className="w-full px-6 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:border-primary transition-colors font-lora"
                  placeholder="Any dietary restrictions or allergies we should know about?"
                  rows={3}
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-playfair text-lg font-semibold hover:shadow-lg transition-shadow"
                >
                  Submit RSVP
                </motion.button>
              </motion.div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6 }} className="mb-6">
                <Heart className="w-16 h-16 text-primary mx-auto fill-primary" />
              </motion.div>
              <h3 className="font-playfair text-3xl font-bold text-foreground mb-4">Thank You!</h3>
              <p className="font-lora text-foreground/70 text-lg">
                Your RSVP has been received. We're thrilled to celebrate with you!
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="font-lora text-foreground/60 mb-4">Questions? Get in touch:</p>
          <p className="font-playfair text-xl font-semibold text-foreground">
            contact@babygirlcelebration.com
          </p>
        </motion.div>
      </div>
    </section>
  )
}
