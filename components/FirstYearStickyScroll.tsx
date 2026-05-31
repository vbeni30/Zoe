'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';

export type MonthTimelineEntry = {
  label: string;
  title: string;
  image: string;
  progress: number;
};

type FirstYearStickyScrollProps = {
  items: MonthTimelineEntry[];
};

function OdometerDigit({ digit }: { digit: string }) {
  return (
    <div className="relative h-[4.5rem] w-[3.25rem] overflow-hidden rounded-xl border border-pink-300/40 bg-gradient-to-b from-slate-900 to-slate-800 shadow-[inset_0_2px_12px_rgba(0,0,0,0.45),0_8px_24px_rgba(236,72,153,0.15)] sm:h-24 sm:w-16">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center font-mono text-4xl font-semibold tabular-nums text-pink-100 sm:text-5xl"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function NavButton({
  direction,
  label,
  onClick,
  disabled,
}: {
  direction: 'prev' | 'next';
  label: string;
  onClick: () => void;
  disabled: boolean;
}) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-pink-200/80 bg-white/90 text-pink-500 shadow-md backdrop-blur-sm transition-all hover:scale-105 hover:bg-white hover:shadow-lg disabled:pointer-events-none disabled:opacity-35 sm:h-12 sm:w-12"
    >
      <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} />
    </button>
  );
}

export default function FirstYearStickyScroll({ items }: FirstYearStickyScrollProps) {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const count = items.length;
  const active = items[activeIndex] ?? items[0];
  const isYearStep = activeIndex === count - 1;
  const display = isYearStep ? '01' : String(activeIndex + 1).padStart(2, '0');
  const [d0, d1] = display.split('');

  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < count - 1;

  const goPrev = useCallback(() => {
    setActiveIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => Math.min(count - 1, i + 1));
  }, [count]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goPrev, goNext]);

  if (!active || count === 0) return null;

  return (
    <div className="relative w-full bg-[var(--pink-bg)] bg-pattern-pink-soft">
      <div className="mx-auto flex w-full max-w-6xl flex-col px-4 py-8 sm:px-6 sm:py-10 lg:flex-row lg:items-center lg:gap-10 lg:py-12">
        <div className="flex flex-1 flex-col justify-center lg:max-w-[42%]">
          <div className="flex flex-col items-start gap-4">
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.32em] text-pink-500">
              {isYearStep ? 'Milestone' : t.month}
            </p>
            <div className="flex items-center gap-2 sm:gap-3">
              <OdometerDigit digit={d0} />
              <OdometerDigit digit={d1} />
            </div>
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              {String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 space-y-3"
            >
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-pink-500">
                {active.label}
              </p>
              <h3 className="font-serif text-3xl font-light leading-tight tracking-tight text-balance text-slate-800 sm:text-4xl lg:text-[2.75rem]">
                {active.title}
              </h3>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 w-full max-w-xs">
            <div className="mb-2 flex justify-between font-sans text-[10px] uppercase tracking-widest text-slate-400">
              <span>{t.progress}</span>
              <span>{active.progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-pink-100">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500"
                animate={{ width: `${active.progress}%` }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3 lg:hidden">
            <NavButton direction="prev" label={t.timelinePrevious} onClick={goPrev} disabled={!canGoPrev} />
            <NavButton direction="next" label={t.timelineNext} onClick={goNext} disabled={!canGoNext} />
          </div>
        </div>

        <div className="relative mt-8 w-full flex-shrink-0 lg:mt-0 lg:flex-1">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden lg:flex">
              <NavButton direction="prev" label={t.timelinePrevious} onClick={goPrev} disabled={!canGoPrev} />
            </div>

            <div className="relative min-h-[min(48vh,420px)] flex-1 overflow-hidden rounded-[32px] border border-pink-200/80 bg-pink-50 shadow-[0_24px_60px_rgba(244,114,182,0.18)] lg:min-h-[min(64vh,560px)]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.image}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={active.image}
                    alt={`${active.label}: ${active.title}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 640px"
                    quality={80}
                    priority={activeIndex <= 1}
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pink-950/30 via-transparent to-transparent" />
              <div className="absolute top-4 right-4 rounded-full border border-white/40 bg-black/25 px-3 py-1.5 backdrop-blur-md">
                <span className="font-mono text-xs font-semibold text-white tabular-nums">
                  {active.progress}%
                </span>
              </div>
            </div>

            <div className="hidden lg:flex">
              <NavButton direction="next" label={t.timelineNext} onClick={goNext} disabled={!canGoNext} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
