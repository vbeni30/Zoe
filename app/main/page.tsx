'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/** All images that actually exist in /public (all converted to .webp) */
const ALL_PUBLIC_IMAGES = [
  '/IMG_0887.webp',
  '/IMG_1031.webp',
  '/IMG_1300.webp',
  '/IMG_1384.webp',
  '/IMG_2121.webp',
  '/IMG_2899.webp',
  '/IMG_5085.webp',
  '/IMG_5234.webp',
  '/christmas-1.webp',
  '/christmas-2.webp',
  '/christmas-3.webp',
  '/hello-zoe.webp',
  '/month-0.webp',
  '/month-1.webp',
  '/month-2.webp',
  '/month-2a.webp',
  '/month-5.webp',
  '/month-6.webp',
  '/palying-2.webp',
  '/pilot.webp',
  '/playing.webp',
  '/silly.webp',
  '/smile.webp',
];

/** Fisher-Yates shuffle that returns a new array */
function shuffled<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
};

/**
 * Image slot assignments.
 * Slots:
 *   gallery1 – gallery4   →  "Growing Together" section (4 cards)
 *   month1  – month12     →  "Twelve Precious Months" section (12 cards)
 */
type SlotMap = {
  gallery1: string; gallery2: string; gallery3: string; gallery4: string;
  month1: string; month2: string; month3: string; month4: string;
  month5: string; month6: string; month7: string; month8: string;
  month9: string; month10: string; month11: string; month12: string;
};

function buildSlots(pool: string[]): SlotMap {
  const s = pool.slice(0, 16);
  return {
    // ── Growing Together gallery ──────────────────────────────
    gallery1: s[0],  // card 1
    gallery2: s[1],  // card 2
    gallery3: s[2],  // card 3
    gallery4: s[3],  // card 4
    // ── Twelve Precious Months timeline ──────────────────────
    month1: s[4],   // Month 1  – Welcome to the World
    month2: s[5],   // Month 2  – First Smiles
    month3: s[6],   // Month 3  – Growing Strong
    month4: s[7],   // Month 4  – First Giggles
    month5: s[8],   // Month 5  – Curious Eyes
    month6: s[9],   // Month 6  – Six Months Old
    month7: s[10],  // Month 7  – Learning & Playing
    month8: s[11],  // Month 8  – On the Move
    month9: s[12],  // Month 9  – Exploring the World
    month10: s[13],  // Month 10 – Almost There
    month11: s[14],  // Month 11 – Moments of Joy
    month12: s[15],  // Month 12 – One Year Celebration
  };
}

export default function Home() {
  // Stable order on server → hydration OK. Shuffle after hydration on client.
  const [slots, setSlots] = useState<SlotMap>(() => buildSlots(ALL_PUBLIC_IMAGES));

  useEffect(() => {
    setSlots(buildSlots(shuffled(ALL_PUBLIC_IMAGES)));
  }, []);

  const galleryImages = [slots.gallery1, slots.gallery2, slots.gallery3, slots.gallery4];

  const monthImages: Record<number, string> = {
    1: slots.month1, 2: slots.month2, 3: slots.month3, 4: slots.month4,
    5: slots.month5, 6: slots.month6, 7: slots.month7, 8: slots.month8,
    9: slots.month9, 10: slots.month10, 11: slots.month11, 12: slots.month12,
  };

  return (
    // Single centred column — same width as a phone on every screen
    <main className="bg-[#fff7fb] overflow-hidden">
      <div className="max-w-sm mx-auto">

        {/* ── Hero Section ─────────────────────────────────────── */}
        <section className="relative w-full h-[100svh] overflow-hidden">
          <motion.div
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <img
              src="/hero-image.webp"
              alt="Zoe's First Birthday Celebration"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </section>

        {/* ── Celebrating One Year ──────────────────────────────── */}
        <section className="relative py-16 px-4 bg-gradient-to-b from-[#fff7fb] via-white to-white">
          <div>
            <motion.div
              className="space-y-12"
              {...fadeInUp}
              viewport={{ once: true }}
            >
              {/* Heading */}
              <div className="text-center">
                <p className="font-lora text-[11px] text-pink-500/70 font-light tracking-[0.28em] uppercase mb-4">
                  Zoe turns one
                </p>
                <h2 className="font-playfair text-4xl text-slate-900 font-light tracking-tight">
                  Celebrating One Year
                </h2>
                <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
                <p className="mt-6 font-lora text-base text-slate-600/90 font-light leading-relaxed">
                  of love, laughter, and beautiful memories
                </p>
              </div>

              {/* Info Cards — single column stack */}
              <div className="flex flex-col gap-4">
                {[
                  { label: 'Date', value: 'Saturday, April 19th, 2025' },
                  { label: 'Time', value: '2:00 PM – 5:00 PM' },
                  { label: 'Location', value: 'Garden Pavilion, 123 Main Street' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="text-center rounded-2xl border border-pink-100/70 bg-white/75 backdrop-blur-sm px-6 py-7 shadow-[0_1px_0_0_rgba(236,72,153,0.06)]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <p className="font-lora text-[11px] text-pink-500/70 font-light tracking-[0.26em] uppercase mb-3">
                      {item.label}
                    </p>
                    <p className="font-lora text-lg text-slate-900 font-light leading-relaxed">
                      {item.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Growing Together Gallery ──────────────────────────── */}
        <section className="py-16 px-4 bg-[#fff7fb]">
          <motion.div
            className="space-y-10"
            {...fadeInUp}
            viewport={{ once: true }}
          >
            {/* Heading */}
            <div className="text-center">
              <p className="font-lora text-[11px] text-pink-500/70 font-light tracking-[0.28em] uppercase mb-4">
                Sweet little moments
              </p>
              <h2 className="font-playfair text-4xl text-slate-900 text-center font-light tracking-tight">
                Growing Together
              </h2>
              <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
            </div>

            {/* Gallery — single column stack */}
            <div className="flex flex-col gap-4">
              {galleryImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  className="group relative rounded-3xl overflow-hidden border border-pink-100/70 bg-white shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                >
                  <img
                    src={img}
                    alt={`Memory ${idx + 1}`}
                    className="w-full h-80 object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pink-950/10 via-transparent to-transparent" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── The Celebration ───────────────────────────────────── */}
        <section className="py-16 px-4 bg-gradient-to-b from-white to-[#fff7fb]">
          <motion.div
            className="text-center"
            {...fadeInUp}
            viewport={{ once: true }}
          >
            <div className="rounded-3xl border border-pink-100/70 bg-white/80 backdrop-blur-sm px-6 py-10 shadow-[0_1px_0_0_rgba(236,72,153,0.06)]">
              <p className="font-lora text-[11px] text-pink-500/70 font-light tracking-[0.28em] uppercase mb-4">
                A little note
              </p>
              <h2 className="font-playfair text-4xl text-slate-900 font-light tracking-tight">
                The Celebration
              </h2>
              <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-pink-200 to-transparent" />

              <div className="mt-7 space-y-5">
                <p className="font-lora text-base text-slate-600/90 leading-relaxed font-light">
                  Join us as we celebrate this beautiful milestone in our daughter's life. One year has been filled with boundless joy, unconditional love, and countless precious moments that we treasure.
                </p>
                <p className="font-lora text-base text-slate-600/90 leading-relaxed font-light">
                  The celebration will feature delicious cake, elegant refreshments, delightful entertainment, and quality time with those who matter most.
                </p>
                <p className="font-lora text-lg text-slate-900 italic font-light tracking-wide pt-2">
                  Your presence is the most precious gift of all.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── Twelve Precious Months ────────────────────────────── */}
        <section className="py-16 px-4 bg-[#fff7fb]">
          <div>
            {/* Heading */}
            <motion.div
              className="text-center mb-10"
              {...fadeInUp}
              viewport={{ once: true }}
            >
              <p className="font-lora text-[11px] text-pink-500/70 font-light tracking-[0.28em] uppercase mb-4">
                Her first year
              </p>
              <h2 className="font-playfair text-4xl text-slate-900 font-light tracking-tight">
                Twelve Precious Months
              </h2>
              <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
              <p className="mt-6 text-base text-slate-600/90 font-lora font-light leading-relaxed">
                A journey through each milestone of her first year
              </p>
            </motion.div>

            {/* Month cards — horizontal snap scroll on all screen sizes */}
            <div className="-mx-4 px-4 flex flex-row gap-4 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                  className="snap-center flex-shrink-0 w-[300px] rounded-3xl border border-pink-100/70 bg-white/80 backdrop-blur-sm p-5 shadow-[0_1px_0_0_rgba(236,72,153,0.06)]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.04 }}
                  viewport={{ once: true }}
                >
                  {/* Month label */}
                  <div className="mb-4">
                    <p className="font-lora text-[11px] text-pink-500/70 font-light uppercase tracking-[0.26em] mb-2">
                      Month {item.month}
                    </p>
                    <h3 className="font-playfair text-lg text-slate-900 font-light tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Photo */}
                  <div className="relative w-full h-72 rounded-2xl overflow-hidden border border-pink-100/70 bg-white">
                    <img
                      src={monthImages[item.month]}
                      alt={`Month ${item.month}: ${item.title}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────── */}
      </div> {/* end max-w-sm wrapper */}
      <footer className="bg-white border-t border-pink-100/70 py-14 px-4">
        <motion.div
          className="max-w-sm mx-auto text-center space-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="font-playfair text-3xl text-slate-900 font-light tracking-tight">
            With Love &amp; Gratitude
          </p>
          <p className="font-lora text-xs text-slate-500/80 font-light">
            © 2025 Baby Girl's First Birthday Celebration
          </p>
        </motion.div>
      </footer>
    </main>
  );
}
