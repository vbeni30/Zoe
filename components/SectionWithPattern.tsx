'use client';

import React from 'react';

type PatternVariant = 'dots' | 'lines' | 'none';

interface SectionWithPatternProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  pattern?: PatternVariant;
  /** Optional gradient overlay: e.g. from-pink to white */
  gradient?: string;
}

const patternClass: Record<PatternVariant, string> = {
  dots: 'bg-pattern-pink-soft',
  lines: 'bg-pattern-lines',
  none: 'bg-[var(--pink-bg)]',
};

export default function SectionWithPattern({
  children,
  id,
  className = '',
  pattern = 'dots',
  gradient = '',
}: SectionWithPatternProps) {
  const base = pattern === 'none' ? 'bg-[var(--pink-bg)]' : patternClass[pattern];
  return (
    <section id={id} className={`${base} ${gradient} ${className}`}>
      {children}
    </section>
  );
}
