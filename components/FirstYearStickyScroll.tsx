'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

export type MonthTimelineEntry = {
  label: string;
  title: string;
  image: string;
  progress: number;
};

type FirstYearStickyScrollProps = {
  items: MonthTimelineEntry[];
};

type ScrollPhase = 'before' | 'pinned' | 'after';

function OdometerDigit({ digit }: { digit: string }) {
  return (
    <div className="relative h-[4.5rem] w-[3.25rem] sm:h-24 sm:w-16 overflow-hidden rounded-xl border border-pink-300/40 bg-gradient-to-b from-slate-900 to-slate-800 shadow-[inset_0_2px_12px_rgba(0,0,0,0.45),0_8px_24px_rgba(236,72,153,0.15)]">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center font-mono text-4xl sm:text-5xl font-semibold tabular-nums text-pink-100"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function ViewportPanel({
  items,
  activeIndex,
  phase,
}: {
  items: MonthTimelineEntry[];
  activeIndex: number;
  phase: ScrollPhase;
}) {
  const active = items[activeIndex] ?? items[0];
  const isYearStep = activeIndex === items.length - 1;
  const display = isYearStep ? '01' : String(activeIndex).padStart(2, '0');
  const [d0, d1] = display.split('');

  if (!active) return null;

  return (
    <div className="relative flex h-full w-full flex-col bg-[var(--pink-bg)] bg-pattern-pink-soft">
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-12">
      <div className="flex flex-1 flex-col justify-center pt-8 lg:max-w-[42%] lg:pt-0">
        <div className="flex flex-col items-start gap-4">
          <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-pink-500 font-bold">
            {isYearStep ? 'Milestone' : 'Month'}
          </p>
          <div className="flex items-center gap-2 sm:gap-3">
            <OdometerDigit digit={d0} />
            <OdometerDigit digit={d1} />
          </div>
          <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-slate-400 font-semibold">
            {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
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
            <p className="font-sans text-xs uppercase tracking-[0.28em] text-pink-500 font-semibold">
              {active.label}
            </p>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-slate-800 font-light leading-tight text-balance">
              {active.title}
            </h3>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 w-full max-w-xs">
          <div className="mb-2 flex justify-between font-sans text-[10px] uppercase tracking-widest text-slate-400">
            <span>{phase === 'after' ? 'Complete' : 'Progress'}</span>
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
      </div>

      <div className="relative mt-6 h-[min(48vh,420px)] w-full flex-shrink-0 lg:mt-0 lg:h-[min(72vh,640px)] lg:flex-1">
        <div className="relative h-full w-full overflow-hidden rounded-[32px] border border-pink-200/80 bg-pink-50 shadow-[0_24px_60px_rgba(244,114,182,0.18)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.image}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={active.image}
                alt={`${active.label}: ${active.title}`}
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                quality={80}
                priority={activeIndex <= 1}
                loading={activeIndex <= 1 ? 'eager' : 'lazy'}
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
      </div>

      {phase === 'pinned' && activeIndex < items.length - 1 && (
        <motion.p
          className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-[10px] uppercase tracking-[0.3em] text-pink-500/70"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to continue
        </motion.p>
      )}
      </div>
    </div>
  );
}

export default function FirstYearStickyScroll({ items }: FirstYearStickyScrollProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<ScrollPhase>('before');
  const [activeIndex, setActiveIndex] = useState(0);

  const updateScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || items.length === 0) return;

    const vh = window.innerHeight;
    const rect = track.getBoundingClientRect();
    const scrollable = track.offsetHeight - vh;

    let nextPhase: ScrollPhase = 'before';
    if (rect.top <= 0 && rect.bottom > vh) {
      nextPhase = 'pinned';
    } else if (rect.bottom <= vh) {
      nextPhase = 'after';
    }

    setPhase(nextPhase);

    if (items.length === 1) {
      setActiveIndex(0);
      return;
    }

    let progress = 0;
    if (nextPhase === 'pinned' && scrollable > 0) {
      progress = Math.max(0, Math.min(1, -rect.top / scrollable));
    } else if (nextPhase === 'after') {
      progress = 1;
    }

    const idx = Math.round(progress * (items.length - 1));
    setActiveIndex(Math.min(items.length - 1, Math.max(0, idx)));
  }, [items.length]);

  useEffect(() => {
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll);
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, [updateScroll]);

  const panelPosition =
    phase === 'pinned'
      ? 'fixed left-0 right-0 top-0 z-40 h-[100svh]'
      : phase === 'after'
        ? 'absolute bottom-0 left-0 right-0 h-[100svh]'
        : 'relative h-[100svh]';

  return (
    <div
      ref={trackRef}
      className="relative w-full"
      style={{ height: `${Math.max(items.length, 1) * 100}vh` }}
    >
      <div className={panelPosition}>
        <ViewportPanel items={items} activeIndex={activeIndex} phase={phase} />
      </div>
    </div>
  );
}
