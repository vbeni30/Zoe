'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type StickyScrollItem = {
  title: string;
  description: string;
  content?: React.ReactNode;
};

type StickyScrollProps = {
  content: StickyScrollItem[];
  contentClassName?: string;
  className?: string;
};

export function StickyScroll({
  content,
  contentClassName,
  className,
}: StickyScrollProps) {
  const [activeCard, setActiveCard] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setSlideRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    slideRefs.current[index] = el;
  }, []);

  useEffect(() => {
    const elements = slideRefs.current.filter(Boolean) as HTMLDivElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const index = Number(visible[0].target.getAttribute('data-index'));
          if (!Number.isNaN(index)) setActiveCard(index);
        }
      },
      {
        root: null,
        rootMargin: '-35% 0px -35% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [content.length]);

  return (
    <div className={cn('relative w-full', className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-14 xl:gap-20">
        {/* Left: tall scroll column — one full viewport step per month */}
        <div className="relative z-10">
          {content.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              ref={setSlideRef(index)}
              data-index={index}
              className="min-h-[100svh] flex flex-col justify-center py-16 lg:py-24 px-1 sm:px-2"
            >
              {/* Mobile / tablet: image inline with each step */}
              <div className="lg:hidden mb-10">
                <div
                  className={cn(
                    'relative aspect-[4/5] w-full max-h-[420px] overflow-hidden rounded-[32px] border border-pink-100 bg-white shadow-[0_20px_50px_rgba(244,114,182,0.1)]',
                    contentClassName,
                  )}
                >
                  {item.content}
                </div>
              </div>

              <motion.div
                initial={false}
                animate={{
                  opacity: activeCard === index ? 1 : 0.25,
                  y: activeCard === index ? 0 : 16,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-5"
              >
                <p className="font-sans text-xs uppercase tracking-[0.28em] text-pink-500 font-semibold">
                  {item.title}
                </p>
                <h3 className="font-serif text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-slate-800 font-light tracking-tight leading-[1.08] text-balance">
                  {item.description}
                </h3>
                <div
                  className={cn(
                    'h-1.5 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 transition-all duration-500',
                    activeCard === index ? 'w-28 opacity-100' : 'w-10 opacity-30',
                  )}
                />
              </motion.div>
            </div>
          ))}
        </div>

        {/* Right: sticky image panel — stays fixed while left column scrolls */}
        <div className="hidden lg:block">
          <div className="sticky top-20 xl:top-24 h-[calc(100svh-6rem)] xl:h-[calc(100svh-7rem)]">
            <div
              className={cn(
                'relative h-full w-full overflow-hidden rounded-[40px] border border-pink-100/80 bg-white shadow-[0_28px_70px_rgba(244,114,182,0.14)]',
                contentClassName,
              )}
            >
              {content.map((item, index) => (
                <motion.div
                  key={`sticky-img-${index}`}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: activeCard === index ? 1 : 0,
                    scale: activeCard === index ? 1 : 1.05,
                    zIndex: activeCard === index ? 2 : 1,
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {item.content}
                </motion.div>
              ))}

              <div className="absolute bottom-6 left-6 z-20 rounded-full border border-white/50 bg-black/30 px-5 py-2.5 backdrop-blur-md">
                <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-white font-semibold">
                  {String(activeCard + 1).padStart(2, '0')} / {String(content.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
