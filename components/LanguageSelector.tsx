'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { Locale } from '@/lib/translations';

const options: { value: Locale; label: string; flag: string }[] = [
  { value: 'en', label: 'English', flag: '🇬🇧' },
  { value: 'am', label: 'አማርኛ', flag: '🇪🇹' },
  { value: 'fr', label: 'Français', flag: '🇫🇷' },
];

export default function LanguageSelector() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = options.find((o) => o.value === locale);

  return (
    <div ref={ref} className="relative z-50">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md px-4 py-2.5 text-sm font-lora text-slate-700 shadow-md ring-1 ring-pink-200/70 hover:bg-pink-50/80 transition-colors"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4 text-pink-600" />
        <span className="hidden sm:inline">{current?.flag}</span>
        <span className="font-medium">{current?.label}</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 w-40 rounded-2xl bg-white/95 shadow-xl ring-1 ring-pink-200/60 overflow-hidden backdrop-blur-md"
          >
            {options.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => {
                    setLocale(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left font-lora text-sm transition-colors ${
                    locale === opt.value
                      ? 'bg-pink-50 text-pink-700'
                      : 'text-slate-600 hover:bg-pink-50/50'
                  }`}
                >
                  <span>{opt.flag}</span>
                  <span>{opt.label}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
