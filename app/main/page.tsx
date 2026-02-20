'use client';

import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

export default function Home() {
  return (
    <main className="bg-[#fff7fb] overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src="/hero-image.png"
            alt="Zoe's First Birthday Celebration"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </section>



      {/* Celebrating One Year - Minimalist Section */}
      <section className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-gradient-to-b from-[#fff7fb] via-white to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="space-y-12 sm:space-y-14 md:space-y-20"
            {...fadeInUp}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <p className="font-lora text-[11px] sm:text-xs text-pink-500/70 font-light tracking-[0.28em] uppercase mb-4">
                Zoe turns one
              </p>
              <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 font-light tracking-tight">
                Celebrating One Year
              </h2>
              <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
              <p className="mt-6 font-lora text-base sm:text-lg text-slate-600/90 font-light max-w-2xl mx-auto leading-relaxed">
                of love, laughter, and beautiful memories
              </p>
            </div>

            {/* Clean Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[
                {
                  label: 'Date',
                  value: 'Saturday, April 19th, 2025'
                },
                {
                  label: 'Time',
                  value: '2:00 PM - 5:00 PM'
                },
                {
                  label: 'Location',
                  value: 'Garden Pavilion, 123 Main Street'
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="text-center rounded-2xl border border-pink-100/70 bg-white/75 backdrop-blur-sm px-6 py-7 sm:py-8 shadow-[0_1px_0_0_rgba(236,72,153,0.06)]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <p className="font-lora text-[11px] text-pink-500/70 font-light tracking-[0.26em] uppercase mb-3">
                    {item.label}
                  </p>
                  <p className="font-lora text-lg sm:text-xl md:text-2xl text-slate-900 font-light leading-relaxed">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Growing Together - Clean Gallery */}
      <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-[#fff7fb]">
        <motion.div
          className="max-w-7xl mx-auto space-y-10 sm:space-y-14 md:space-y-20"
          {...fadeInUp}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <p className="font-lora text-[11px] sm:text-xs text-pink-500/70 font-light tracking-[0.28em] uppercase mb-4">
              Sweet little moments
            </p>
            <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 text-center font-light tracking-tight">
              Growing Together
            </h2>
            <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {[
              '/images/first-smile.jpg',
              '/images/birthday-cake.jpg',
              '/images/baby-girl-celebration.jpg',
              '/images/newborn-moment.jpg'
            ].map((img, idx) => (
              <motion.div
                key={idx}
                className="group relative rounded-3xl overflow-hidden border border-pink-100/70 bg-white shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <img
                  src={img}
                  alt={`Memory ${idx + 1}`}
                  className="w-full h-80 sm:h-96 object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pink-950/10 via-transparent to-transparent" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* The Celebration - About Section */}
      <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-gradient-to-b from-white to-[#fff7fb]">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          {...fadeInUp}
          viewport={{ once: true }}
        >
          <div className="rounded-3xl border border-pink-100/70 bg-white/80 backdrop-blur-sm px-6 py-10 sm:px-10 sm:py-12 shadow-[0_1px_0_0_rgba(236,72,153,0.06)]">
            <p className="font-lora text-[11px] sm:text-xs text-pink-500/70 font-light tracking-[0.28em] uppercase mb-4">
              A little note
            </p>
            <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 font-light tracking-tight">
              The Celebration
            </h2>
            <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-pink-200 to-transparent" />

            <div className="mt-7 sm:mt-8 space-y-5 sm:space-y-6">
              <p className="font-lora text-base sm:text-lg md:text-xl text-slate-600/90 leading-relaxed font-light">
                Join us as we celebrate this beautiful milestone in our daughter's life. One year has been filled with boundless joy, unconditional love, and countless precious moments that we treasure.
              </p>
              <p className="font-lora text-base sm:text-lg md:text-xl text-slate-600/90 leading-relaxed font-light">
                The celebration will feature delicious cake, elegant refreshments, delightful entertainment, and quality time with those who matter most.
              </p>
              <p className="font-lora text-lg sm:text-xl md:text-2xl text-slate-900 italic font-light tracking-wide pt-2 sm:pt-4">
                Your presence is the most precious gift of all.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 12 Months Timeline Gallery */}
      <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-[#fff7fb]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-10 sm:mb-14 md:mb-16"
            {...fadeInUp}
            viewport={{ once: true }}
          >
            <p className="font-lora text-[11px] sm:text-xs text-pink-500/70 font-light tracking-[0.28em] uppercase mb-4">
              Her first year
            </p>
            <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 font-light tracking-tight">
              Twelve Precious Months
            </h2>
            <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
            <p className="mt-6 text-base sm:text-lg text-slate-600/90 font-lora font-light leading-relaxed">
              A journey through each milestone of her first year
            </p>
          </motion.div>

          {/* Mobile: horizontal snap scroll | sm+: 2-column grid */}
          <div
            className="flex flex-row sm:grid sm:grid-cols-2 gap-4 md:gap-8 overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {[
              { month: 1, title: 'Welcome to the World' },
              { month: 2, title: 'First Smiles' },
              { month: 3, title: 'Growing Strong' },
              { month: 4, title: 'First Giggles' },
              { month: 5, title: 'Curious Eyes' },
              { month: 6, title: 'Six Months Old' },
              { month: 7, title: 'Learning & Playing' },
              { month: 8, title: 'On the Move' },
              { month: 9, title: 'Exploring the World' },
              { month: 10, title: 'Almost There' },
              { month: 11, title: 'Moments of Joy' },
              { month: 12, title: 'One Year Celebration' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="snap-center flex-shrink-0 w-[85vw] sm:w-auto rounded-3xl border border-pink-100/70 bg-white/80 backdrop-blur-sm p-5 sm:p-6 shadow-[0_1px_0_0_rgba(236,72,153,0.06)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
                viewport={{ once: true }}
              >
                {/* Month Info */}
                <div className="mb-4">
                  <p className="font-lora text-[11px] text-pink-500/70 font-light uppercase tracking-[0.26em] mb-2">
                    Month {item.month}
                  </p>
                  <h3 className="font-playfair text-lg sm:text-xl text-slate-900 font-light tracking-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Image Container */}
                <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-pink-100/70 bg-white">
                  <img
                    src={`/images/month-${item.month}.jpg`}
                    alt={`Month ${item.month}: ${item.title}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/baby-girl-celebration.jpg';
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-white border-t border-pink-100/70 py-14 sm:py-16 px-4 sm:px-6">
        <motion.div
          className="max-w-6xl mx-auto text-center space-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="font-playfair text-3xl sm:text-4xl md:text-5xl text-slate-900 font-light tracking-tight">
            With Love & Gratitude
          </p>
          <p className="font-lora text-xs sm:text-sm text-slate-500/80 font-light">
            © 2025 Baby Girl's First Birthday Celebration
          </p>
        </motion.div>
      </footer>
    </main>
  );
}
